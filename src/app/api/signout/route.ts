import { NextResponse } from "next/server";

const AUTH_COOKIES = [
  "user",
  "user_role",
  "user_name",
  "auth_token",
  "sales_person_id",
  "project_id",
  "project_name",
  "sales_bootstrap_id",
  "sales_project_options",
];

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  AUTH_COOKIES.forEach((name) => {
    response.cookies.set({
      name,
      value: "",
      path: "/",
      expires: new Date(0),
    });
  });

  return response;
}
