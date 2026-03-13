import { NextResponse } from "next/server";

import { listResponses } from "@/lib/db";

export async function GET() {
  const responses = await listResponses();
  return NextResponse.json({ ok: true, responses });
}
