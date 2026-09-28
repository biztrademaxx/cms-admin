import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const projectId = body.projectId as string;
    const requestedSalesPersonId = body.salesPersonId as string | undefined;
    const cookieStore = await cookies();
    const anchorId =
      cookieStore.get("sales_person_id")?.value ||
      cookieStore.get("sales_bootstrap_id")?.value;
    const role = cookieStore.get("user_role")?.value;

    if (role !== "SALES" || !projectId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const optionsCookie = cookieStore.get("sales_project_options")?.value;
    let cookieOptionsList: { salesPersonId: string; projectId: string; projectName?: string }[] =
      [];
    if (optionsCookie) {
      try {
        cookieOptionsList = JSON.parse(decodeURIComponent(optionsCookie));
      } catch {
        cookieOptionsList = [];
      }
    }

    const fromCookie = cookieOptionsList.find((o) => o.projectId === projectId);
    if (fromCookie) {
      const response = NextResponse.json({
        message: "Project switched",
        projectId: fromCookie.projectId,
        projectName: fromCookie.projectName ?? "",
        salesPersonId: fromCookie.salesPersonId,
      });
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24 * 7,
      };
      response.cookies.set({
        name: "sales_person_id",
        value: fromCookie.salesPersonId,
        ...cookieOptions,
      });
      response.cookies.set({
        name: "project_id",
        value: fromCookie.projectId,
        ...cookieOptions,
      });
      response.cookies.set({
        name: "project_name",
        value: fromCookie.projectName ?? "",
        ...cookieOptions,
      });
      response.cookies.set({
        name: "sales_bootstrap_id",
        value: "",
        ...cookieOptions,
        maxAge: 0,
      });
      return response;
    }

    if (requestedSalesPersonId) {
      const response = NextResponse.json({
        message: "Project switched",
        projectId,
        salesPersonId: requestedSalesPersonId,
      });
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24 * 7,
      };
      response.cookies.set({
        name: "sales_person_id",
        value: requestedSalesPersonId,
        ...cookieOptions,
      });
      response.cookies.set({
        name: "project_id",
        value: projectId,
        ...cookieOptions,
      });
      return response;
    }

    if (!anchorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    });

    const json = await res.json();
    const memberships = json.data?.getSalesProjectMemberships ?? [];
    const match = memberships.find(
      (m: { projectId: string }) => m.projectId === projectId
    );

    if (!match) {
      return NextResponse.json({ error: "Not a member of this project" }, { status: 403 });
    }

    const response = NextResponse.json({
      message: "Project switched",
      projectId: match.projectId,
      projectName: match.project?.name ?? "",
      salesPersonId: match.id,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7,
    };

    response.cookies.set({
      name: "sales_person_id",
      value: match.id,
      ...cookieOptions,
    });
    response.cookies.set({
      name: "project_id",
      value: match.projectId,
      ...cookieOptions,
    });
    response.cookies.set({
      name: "project_name",
      value: match.project?.name ?? "",
      ...cookieOptions,
    });
    response.cookies.set({
      name: "sales_bootstrap_id",
      value: "",
      ...cookieOptions,
      maxAge: 0,
    });
    response.cookies.set({
      name: "sales_project_options",
      value: "",
      ...cookieOptions,
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Switch project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
