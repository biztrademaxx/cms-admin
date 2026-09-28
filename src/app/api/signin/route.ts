import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, projectId } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!GRAPHQL_ENDPOINT) {
      return NextResponse.json(
        { error: "Server misconfigured: NEXT_PUBLIC_GRAPHQL_ENDPOINT is missing" },
        { status: 500 }
      );
    }

    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation Login($input: LoginInput!) {
            login(input: $input) {
              token
              role
              name
              email
              salesPersonId
              projectId
              projectName
              requiresProjectSelection
              projectOptions {
                projectId
                projectName
                salesPersonId
              }
            }
          }
        `,
        variables: { input: { email, password, ...(projectId && { projectId }) } },
      }),
    });

    const json = await res.json();

    if (json.errors?.length) {
      const gqlMessage = json.errors[0]?.message ?? "";
      const isAuthFailure =
        gqlMessage.toLowerCase().includes("invalid") ||
        gqlMessage.toLowerCase().includes("unauthorized");
      return NextResponse.json(
        {
          error: isAuthFailure ? "Invalid email or password" : "Login failed",
          detail: gqlMessage,
        },
        { status: 401 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not reach login service. Is cms-backend running on port 3000?" },
        { status: 502 }
      );
    }

    const login = json.data?.login;
    if (!login) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const salesNeedsProjectPick =
      login.role === "SALES" &&
      login.requiresProjectSelection &&
      login.projectOptions?.length;

    const hasToken = Boolean(login.token?.trim());
    if (!hasToken && !salesNeedsProjectPick) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
          detail: "No session token returned. Restart cms-backend (npm run build && npm start).",
        },
        { status: 401 }
      );
    }

    const sessionToken =
      hasToken ? login.token : `sales-pending.${login.email}.${Date.now()}`;

    const response = NextResponse.json({
      message: "Login successful",
      role: login.role,
      name: login.name,
      projectName: login.projectName ?? "",
      redirect: salesNeedsProjectPick
        ? "/sales/select-project"
        : login.role === "SALES"
          ? "/sales"
          : "/",
      projectOptions: salesNeedsProjectPick ? login.projectOptions : undefined,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7,
    };

    response.cookies.set({ name: "user", value: "true", ...cookieOptions });
    response.cookies.set({ name: "user_role", value: login.role, ...cookieOptions });
    response.cookies.set({ name: "user_name", value: login.name, ...cookieOptions });
    response.cookies.set({ name: "auth_token", value: sessionToken, ...cookieOptions });

    if (login.role === "SALES") {
      if (salesNeedsProjectPick) {
        const anchorId = login.projectOptions?.[0]?.salesPersonId;
        if (anchorId) {
          response.cookies.set({
            name: "sales_bootstrap_id",
            value: anchorId,
            ...cookieOptions,
          });
        }
        if (login.projectOptions?.length) {
          response.cookies.set({
            name: "sales_project_options",
            value: encodeURIComponent(JSON.stringify(login.projectOptions)),
            ...cookieOptions,
          });
        }
      } else {
        response.cookies.set({
          name: "sales_person_id",
          value: login.salesPersonId,
          ...cookieOptions,
        });
        response.cookies.set({
          name: "project_id",
          value: login.projectId,
          ...cookieOptions,
        });
        if (login.projectName) {
          response.cookies.set({
            name: "project_name",
            value: login.projectName,
            ...cookieOptions,
          });
        }
      }
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
