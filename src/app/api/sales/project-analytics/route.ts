import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getPeriodStartDate,
  isValidPeriodId,
  SALES_ANALYTICS_PERIODS,
  type AnalyticsPeriodId,
} from "@/lib/salesAnalyticsPeriods";
import { summarizeAssignedLeads } from "@/lib/salesLeadStats";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

type ProjectRow = {
  salesPersonId: string;
  projectId: string;
  projectName: string;
};

async function loadProjects(cookieStore: Awaited<ReturnType<typeof cookies>>): Promise<ProjectRow[]> {
  const optionsCookie = cookieStore.get("sales_project_options")?.value;
  if (optionsCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(optionsCookie)) as ProjectRow[];
      if (parsed?.length) return parsed;
    } catch {
      // fall through
    }
  }

  const anchorId =
    cookieStore.get("sales_person_id")?.value ||
    cookieStore.get("sales_bootstrap_id")?.value;
  if (!anchorId || !GRAPHQL_ENDPOINT) return [];

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetSalesPeople {
          getSalesPeople { id email projectId isActive project { name } }
        }
      `,
    }),
    cache: "no-store",
  });
  const json = await res.json();
  const people: {
    id: string;
    email: string;
    projectId: string;
    isActive: boolean;
    project?: { name: string };
  }[] = json.data?.getSalesPeople ?? [];

  const personRes = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query GetSalesPersonById($id: String!) {
        getSalesPersonById(id: $id) { email }
      }`,
      variables: { id: anchorId },
    }),
    cache: "no-store",
  });
  const personJson = await personRes.json();
  const email = personJson.data?.getSalesPersonById?.email?.toLowerCase();
  if (!email) return [];

  return people
    .filter((p) => p.isActive && p.email.toLowerCase() === email)
    .map((p) => ({
      salesPersonId: p.id,
      projectId: p.projectId,
      projectName: p.project?.name ?? "Project",
    }));
}

async function fetchAssignedLeadsInPeriod(
  projectId: string,
  assignedToId: string,
  createdFrom: Date
): Promise<{ status: string }[]> {
  if (!GRAPHQL_ENDPOINT) return [];

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetFilteredLeads($input: LeadFilterInput!) {
          getFilteredLeads(input: $input) {
            leads { status }
          }
        }
      `,
      variables: {
        input: {
          projectId,
          assignedToId,
          page: 1,
          limit: 2000,
          createdFrom: createdFrom.toISOString(),
        },
      },
    }),
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors?.length) {
    const res2 = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetFilteredLeads($input: LeadFilterInput!) {
            getFilteredLeads(input: $input) {
              leads { status createdAt }
            }
          }
        `,
        variables: {
          input: {
            projectId,
            assignedToId,
            page: 1,
            limit: 2000,
          },
        },
      }),
      cache: "no-store",
    });
    const json2 = await res2.json();
    const leads: { status: string; createdAt: string }[] =
      json2.data?.getFilteredLeads?.leads ?? [];
    return leads.filter((l) => new Date(l.createdAt) >= createdFrom);
  }

  return json.data?.getFilteredLeads?.leads ?? [];
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get("user_role")?.value;
    if (role !== "SALES") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const periodParam = searchParams.get("period") ?? "30d";
    const periodId: AnalyticsPeriodId = isValidPeriodId(periodParam)
      ? periodParam
      : "30d";
    const periodMeta = SALES_ANALYTICS_PERIODS.find((p) => p.id === periodId)!;
    const createdFrom = getPeriodStartDate(periodId);

    const projects = await loadProjects(cookieStore);
    if (!projects.length) {
      return NextResponse.json({
        periodId,
        periodLabel: periodMeta.label,
        projects: [],
      });
    }

    const analytics = await Promise.all(
      projects.map(async (p) => {
        const leads = await fetchAssignedLeadsInPeriod(
          p.projectId,
          p.salesPersonId,
          createdFrom
        );
        const stats = summarizeAssignedLeads(
          leads.map((l) => ({ status: l.status as never }))
        );
        return {
          ...p,
          ...stats,
        };
      })
    );

    return NextResponse.json({
      periodId,
      periodLabel: periodMeta.label,
      projects: analytics,
    });
  } catch (error) {
    console.error("Project analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
