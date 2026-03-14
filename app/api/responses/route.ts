import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_AUTH_COOKIE, isValidAdminSession } from "@/lib/admin-auth";
import { listResponses } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();

  if (!isValidAdminSession(cookieStore.get(ADMIN_AUTH_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const responses = await listResponses();
  return NextResponse.json({ ok: true, responses });
}
