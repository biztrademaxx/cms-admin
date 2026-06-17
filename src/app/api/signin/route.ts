import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const res = await fetch(GRAPHQL_ENDPOINT!, {
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
            }
          }
        `,
        variables: { input: { email, password } },
      }),
    });

    const json = await res.json();

    if (json.errors?.length) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const login = json.data?.login;
    if (!login) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({
      message: "Login successful",
      role: login.role,
      name: login.name,
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
    response.cookies.set({ name: "auth_token", value: login.token, ...cookieOptions });

    if (login.role === "SALES") {
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
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
