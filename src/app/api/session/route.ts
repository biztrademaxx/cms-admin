import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { hydrateSalesSession } from "@/lib/hydrateSalesSession";

export async function GET() {
  const session = await getAuthSession();
  const hydrated = await hydrateSalesSession(session);
  return NextResponse.json(hydrated);
}
