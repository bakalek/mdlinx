import { NextResponse } from "next/server";

import { isSupabaseConfigured, saveResponse } from "@/lib/db";
import { parseQuizSubmission, type DraftQuizSubmission } from "@/lib/validation";

export async function POST(request: Request) {
  const body = (await request.json()) as DraftQuizSubmission;
  const parsedSubmission = parseQuizSubmission(body);

  if (!parsedSubmission.data) {
    return NextResponse.json({ error: "Complete every required field before submitting." }, { status: 400 });
  }

  const savedResponse = await saveResponse(parsedSubmission.data);

  return NextResponse.json({
    ok: true,
    response: savedResponse,
    persistence: isSupabaseConfigured() ? "supabase" : "in-memory",
  });
}
