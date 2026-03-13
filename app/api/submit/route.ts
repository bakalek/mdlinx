import { NextResponse } from "next/server";

import { saveResponse } from "@/lib/db";
import type { QuizSubmission } from "@/lib/questions";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<QuizSubmission>;

  if (!body.name || !body.role || !body.answers) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const savedResponse = await saveResponse(body as QuizSubmission);

  return NextResponse.json({
    ok: true,
    response: savedResponse,
    persistence: process.env.DATABASE_URL ? "database" : "in-memory",
  });
}
