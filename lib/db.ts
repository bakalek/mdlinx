import "server-only";

import { createClient } from "@supabase/supabase-js";

import { sampleAnswers, type QuizSubmission } from "@/lib/questions";

type ResponseRow = {
  id: number;
  name: string;
  role: QuizSubmission["role"];
  answers: QuizSubmission["answers"];
  submitted_at: string;
};

function hasUsableSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return false;
  }

  if (supabaseUrl.includes("project-ref.supabase.co") || supabaseKey === "replace-me") {
    return false;
  }

  return true;
}

function getSupabaseClient() {
  if (!hasUsableSupabaseConfig()) {
    return null;
  }

  const supabaseUrl = process.env.SUPABASE_URL as string;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function mapResponseRow(row: ResponseRow): QuizSubmission {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    answers: row.answers,
    submittedAt: row.submitted_at,
  };
}

export function isSupabaseConfigured() {
  return hasUsableSupabaseConfig();
}

const mockResponses: QuizSubmission[] = [
  {
    id: 1,
    name: "Jordan",
    role: "Executive leadership",
    submittedAt: "2026-03-13T15:00:00.000Z",
    answers: {
      ...sampleAnswers,
      q1: "daily",
      q2: ["chatgpt", "claude", "perplexity"],
      q3: ["research", "analysis", "automation"],
      q4: 4,
      q5: ["audience_personalization", "internal_productivity"],
      q6: "governance",
      q7: ["personalized_content", "internal_efficiency", "new_ai_features"],
      q8: 5,
      q9: "audience_trust",
      q10: "A physician-facing discovery experience that turns intent into personalized, high-trust clinical content.",
    },
  },
  {
    id: 2,
    name: "Casey",
    role: "Product and engineering",
    submittedAt: "2026-03-13T15:10:00.000Z",
    answers: {
      ...sampleAnswers,
      q1: "daily",
      q2: ["chatgpt", "copilot"],
      q3: ["coding", "automation", "analysis"],
      q4: 3,
      q5: ["internal_productivity", "new_ai_features"],
      q6: "technical_talent",
      q7: ["internal_efficiency", "new_ai_features", "clinical_search"],
      q8: 4,
      q9: "first_party_data",
      q10: "An internal workflow layer that drafts, routes, and QA checks content before publication.",
    },
  },
  {
    id: 3,
    name: "Morgan",
    role: "Editorial",
    submittedAt: "2026-03-13T15:20:00.000Z",
    answers: {
      ...sampleAnswers,
      q1: "weekly",
      q2: ["chatgpt", "claude"],
      q3: ["research", "content_creation"],
      q4: 2,
      q5: ["content_creation", "audience_personalization"],
      q6: "change_management",
      q7: ["personalized_content", "clinical_search", "internal_efficiency"],
      q8: 4,
      q9: "domain_expertise",
      q10: "A smarter search and recommendation layer that understands physician intent and surfaces the right medical angle instantly.",
    },
  },
];

export async function listResponses(): Promise<QuizSubmission[]> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("responses")
        .select("id, name, role, answers, submitted_at")
        .order("submitted_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data as ResponseRow[]).map(mapResponseRow);
    } catch {
      return mockResponses;
    }
  }

  return mockResponses;
}

export async function saveResponse(submission: QuizSubmission): Promise<QuizSubmission> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("responses")
        .insert({
          name: submission.name,
          role: submission.role,
          answers: submission.answers,
        })
        .select("id, name, role, answers, submitted_at")
        .single();

      if (error) {
        throw error;
      }

      return mapResponseRow(data as ResponseRow);
    } catch {
      // Fall back so preview environments still work before real Supabase creds are added.
    }
  }

  const nextSubmission = {
    ...submission,
    id: mockResponses.length + 1,
    submittedAt: new Date().toISOString(),
  };

  mockResponses.push(nextSubmission);
  return nextSubmission;
}
