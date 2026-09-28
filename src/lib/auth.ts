import { cookies } from "next/headers";

export async function getAuthSession() {
  const cookieStore = await cookies();
  return {
    isLoggedIn: cookieStore.get("user")?.value === "true",
    role: cookieStore.get("user_role")?.value as "ADMIN" | "SALES" | undefined,
    name: cookieStore.get("user_name")?.value ?? "",
    salesPersonId: cookieStore.get("sales_person_id")?.value ?? "",
    projectId: cookieStore.get("project_id")?.value ?? "",
    projectName: cookieStore.get("project_name")?.value ?? "",
  };
}
