import "server-only";

import { buildDashboardSnapshot } from "@/lib/scoring";
import type { QuizSubmission } from "@/lib/questions";

export type AiDashboardAnalysis = {
  summary: string;
  opportunities: string[];
  risks: string[];
  recommendations: string[];
};

export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "replace-me");
}

export async function generateAiDashboardAnalysis(responses: QuizSubmission[]): Promise<AiDashboardAnalysis | null> {
  if (!isOpenAIConfigured() || responses.length === 0) {
    return null;
  }

  const snapshot = buildDashboardSnapshot(responses);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.3,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "mdlinx_dashboard_analysis",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                summary: { type: "string" },
                opportunities: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 3,
                  maxItems: 3,
                },
                risks: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 3,
                  maxItems: 3,
                },
                recommendations: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 3,
                  maxItems: 3,
                },
              },
              required: ["summary", "opportunities", "risks", "recommendations"],
            },
          },
        },
        messages: [
          {
            role: "system",
            content:
              "You are a senior strategy analyst for healthcare media and publishing businesses. Analyze MDLinx assessment responses. Focus on AI, editorial trust, audience behavior, search/discovery change, commercialization, and operating readiness. Be concrete, concise, and executive-friendly.",
          },
          {
            role: "user",
            content: JSON.stringify({
              instruction:
                "Review the assessment snapshot and produce an executive analysis with one summary, three opportunities, three risks, and three recommendations. Mention patterns, gaps, and implications for MDLinx specifically.",
              snapshot,
              responses: responses.map((response) => ({
                role: response.role,
                q10: response.answers.q10,
                q16: response.answers.q16,
                q17: response.answers.q17,
              })),
            }),
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const body = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = body.choices?.[0]?.message?.content;
    if (!content) {
      return null;
    }

    return JSON.parse(content) as AiDashboardAnalysis;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
