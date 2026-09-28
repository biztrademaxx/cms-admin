import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

type ProjectOption = {
  salesPersonId: string;
  projectId: string;
  projectName: string;
};

function mapLoginOptions(
  options: { salesPersonId: string; projectId: string; projectName: string }[]
): ProjectOption[] {
  return options.map((o) => ({
    salesPersonId: o.salesPersonId,
    projectId: o.projectId,
    projectName: o.projectName ?? "Project",
  }));
}

async function fetchMembershipsViaGraphql(anchorId: string): Promise<ProjectOption[]> {
  const res = await fetch(GRAPHQL_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetSalesProjectMemberships($salesPersonId: String!) {
          getSalesProjectMemberships(salesPersonId: $salesPersonId) {
            id
            projectId
            project { id name }
          }
        }
      `,
      variables: { salesPersonId: anchorId },
    }),
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors?.length) {
    return [];
  }
  return (
    json.data?.getSalesProjectMemberships?.map(
      (m: { id: string; projectId: string; project?: { name: string } }) => ({
        salesPersonId: m.id,
        projectId: m.projectId,
        projectName: m.project?.name ?? "Project",
      })
    ) ?? []
  );
}

async function fetchMembershipsFallback(anchorId: string): Promise<ProjectOption[]> {
  const personRes = await fetch(GRAPHQL_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetSalesPersonById($id: String!) {
          getSalesPersonById(id: $id) { id email projectId project { name } }
        }
      `,
      variables: { id: anchorId },
    }),
    cache: "no-store",
  });
  const personJson = await personRes.json();
  const person = personJson.data?.getSalesPersonById;
  if (!person?.email) return [];

  const allRes = await fetch(GRAPHQL_ENDPOINT!, {
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
  const allJson = await allRes.json();
  const people: {
    id: string;
    email: string;
    projectId: string;
    isActive: boolean;
    project?: { name: string };
  }[] = allJson.data?.getSalesPeople ?? [];

  const email = person.email.toLowerCase();
  return people
    .filter((p) => p.isActive && p.email.toLowerCase() === email)
    .map((p) => ({
      salesPersonId: p.id,
      projectId: p.projectId,
      projectName: p.project?.name ?? "Project",
    }));
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get("user_role")?.value;
    const anchorId =
      cookieStore.get("sales_person_id")?.value ||
      cookieStore.get("sales_bootstrap_id")?.value;

    if (role !== "SALES" || !anchorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const optionsCookie = cookieStore.get("sales_project_options")?.value;
    if (optionsCookie) {
      try {
        const parsed = JSON.parse(decodeURIComponent(optionsCookie)) as {
          salesPersonId: string;
          projectId: string;
          projectName: string;
        }[];
        if (parsed?.length) {
          const currentProjectId = cookieStore.get("project_id")?.value ?? "";
          return NextResponse.json({
            projects: mapLoginOptions(parsed),
            currentProjectId,
            name: cookieStore.get("user_name")?.value,
          });
        }
      } catch {
        // fall through to GraphQL
      }
    }

    if (!GRAPHQL_ENDPOINT) {
      return NextResponse.json({ error: "GraphQL endpoint not configured" }, { status: 500 });
    }

    let projects = await fetchMembershipsViaGraphql(anchorId);
    if (!projects.length) {
      projects = await fetchMembershipsFallback(anchorId);
    }

    const currentProjectId = cookieStore.get("project_id")?.value ?? "";

    return NextResponse.json({
      projects,
      currentProjectId,
      name: cookieStore.get("user_name")?.value,
      ...(projects.length === 0 && {
        hint: "No project memberships found for this sales account. Ask admin to add you under Marketing → Sales Team.",
      }),
    });
  } catch (error) {
    console.error("Sales projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
