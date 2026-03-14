import "server-only";

import { createClient } from "@supabase/supabase-js";

import { sampleAnswers, type QuizAnswers, type QuizSubmission, type RoleOption, type ScaleAnswer } from "@/lib/questions";

type ResponseRow = {
  id: number;
  name: string;
  role: QuizSubmission["role"];
  answers: unknown;
  submitted_at: string;
};

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asScale(value: unknown, fallback: ScaleAnswer): ScaleAnswer {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5 ? value : fallback;
}

function getDefaultPilotTeam(role: RoleOption): string[] {
  switch (role) {
    case "Executive leadership":
      return ["leadership"];
    case "Editorial and content":
      return ["editorial"];
    case "Sales and commercial":
      return ["sales"];
    case "Product and engineering":
      return ["product"];
    case "Data and analytics":
      return ["data"];
    case "Operations and audience":
      return ["operations"];
  }
}

function mapLegacyBarrierToCapabilityGap(value: string) {
  switch (value) {
    case "technical_talent":
      return "ai_product_talent";
    case "data_quality":
      return "data_activation";
    case "governance":
      return "governance_playbook";
    case "change_management":
      return "change_leadership";
    case "budget":
      return "experimentation";
    default:
      return sampleAnswers.q14;
  }
}

function mapLegacyBusinessAreasToWorkflowPressure(values: string[]) {
  const mapped = values.flatMap((value) => {
    switch (value) {
      case "content_creation":
        return ["editorial_velocity", "seo_discovery"];
      case "internal_productivity":
        return ["analytics_storytelling"];
      case "audience_personalization":
        return ["audience_personalization", "email_engagement"];
      case "sales_enablement":
        return ["sponsor_performance"];
      case "advertiser_products":
        return ["sponsor_performance"];
      default:
        return [];
    }
  });

  return mapped.length > 0 ? Array.from(new Set(mapped)) : sampleAnswers.q6;
}

function mapLegacyPriorities(values: string[]) {
  const mapped = values.flatMap((value) => {
    switch (value) {
      case "personalized_content":
        return ["personalized_content"];
      case "internal_efficiency":
        return ["workflow_efficiency"];
      case "new_ai_features":
        return ["new_products"];
      case "advertiser_intelligence":
        return ["commercial_intelligence"];
      case "clinical_search":
        return ["clinical_search"];
      default:
        return [];
    }
  });

  return mapped.length > 0 ? mapped.slice(0, 3) : sampleAnswers.q10;
}

function mapLegacyAdvantage(value: string) {
  switch (value) {
    case "audience_trust":
      return ["audience_trust"];
    case "first_party_data":
      return ["first_party_data"];
    case "content_archive":
      return ["content_archive"];
    case "distribution":
      return ["workflow_integration"];
    case "domain_expertise":
      return ["clinical_context"];
    default:
      return sampleAnswers.q12;
  }
}

function normalizeAnswers(value: unknown, role: RoleOption): QuizAnswers {
  const raw = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const legacyBusinessAreas = asStringArray(raw.q5);
  const legacyPriorities = asStringArray(raw.q7);
  const legacyBarrier = asString(raw.q6);
  const legacyAdvantage = asString(raw.q9);
  const legacyOpenText = asString(raw.q10);

  const normalized: QuizAnswers = {
    q1: asString(raw.q1) as QuizAnswers["q1"] || sampleAnswers.q1,
    q2: asStringArray(raw.q2).length > 0 ? asStringArray(raw.q2) : sampleAnswers.q2,
    q3: asStringArray(raw.q3).length > 0 ? asStringArray(raw.q3) : sampleAnswers.q3,
    q4: asScale(raw.q4, sampleAnswers.q4),
    q5: asScale(raw.q5, asScale(raw.q4, sampleAnswers.q5)),
    q6: asStringArray(raw.q6).length > 0 ? asStringArray(raw.q6) : mapLegacyBusinessAreasToWorkflowPressure(legacyBusinessAreas),
    q7: asStringArray(raw.q7).length > 0 ? asStringArray(raw.q7) : mapLegacyBusinessAreasToWorkflowPressure(legacyBusinessAreas),
    q8: asString(raw.q8) || legacyBarrier || sampleAnswers.q8,
    q9: asScale(raw.q9, asScale(raw.q8, sampleAnswers.q9)),
    q10: asStringArray(raw.q10).length > 0 ? asStringArray(raw.q10).slice(0, 3) : mapLegacyPriorities(legacyPriorities),
    q11: asScale(raw.q11, 3),
    q12: asStringArray(raw.q12).length > 0 ? asStringArray(raw.q12) : mapLegacyAdvantage(legacyAdvantage),
    q13: asStringArray(raw.q13).length > 0 ? asStringArray(raw.q13) : getDefaultPilotTeam(role),
    q14: asString(raw.q14) || mapLegacyBarrierToCapabilityGap(legacyBarrier),
    q15: asString(raw.q15) || sampleAnswers.q15,
    q16: asString(raw.q16) || legacyOpenText || sampleAnswers.q16,
    q17: asString(raw.q17) || sampleAnswers.q17,
  };

  return normalized;
}

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
    answers: normalizeAnswers(row.answers, row.role),
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
      q2: ["chatgpt", "claude", "perplexity", "custom_tools"],
      q3: ["research", "audience_targeting", "analytics"],
      q4: 4,
      q5: 3,
      q6: ["seo_discovery", "audience_personalization", "sponsor_performance"],
      q7: ["clinical_search", "email_personalization", "sales_enablement"],
      q8: "governance",
      q9: 5,
      q10: ["clinical_search", "personalized_content", "commercial_intelligence"],
      q11: 4,
      q12: ["audience_trust", "first_party_data", "commercial_relationships"],
      q13: ["leadership", "sales", "data"],
      q14: "data_activation",
      q15: "sponsor_performance",
      q16: "A physician-intent layer that improves discovery, targeting, and advertiser performance without diluting editorial credibility.",
      q17: "Moving too slowly while search behavior changes and audience expectations shift toward more personalized, AI-assisted experiences.",
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
      q2: ["chatgpt", "copilot", "claude"],
      q3: ["automation", "analytics", "commercial"],
      q4: 3,
      q5: 3,
      q6: ["editorial_velocity", "analytics_storytelling"],
      q7: ["operations_automation", "clinical_search", "audience_segmentation"],
      q8: "technical_talent",
      q9: 4,
      q10: ["workflow_efficiency", "new_products", "clinical_search"],
      q11: 3,
      q12: ["first_party_data", "clinical_context", "workflow_integration"],
      q13: ["product", "data", "operations"],
      q14: "ai_product_talent",
      q15: "ops_efficiency",
      q16: "An internal operating layer that helps teams package content, run experiments, and ship personalization faster with proper guardrails.",
      q17: "Shipping disconnected pilots that never tie back to a measurable product, audience, or revenue outcome.",
    },
  },
  {
    id: 3,
    name: "Morgan",
    role: "Editorial and content",
    submittedAt: "2026-03-13T15:20:00.000Z",
    answers: {
      ...sampleAnswers,
      q1: "weekly",
      q2: ["chatgpt", "claude"],
      q3: ["research", "content_creation"],
      q4: 2,
      q5: 2,
      q6: ["editorial_velocity", "seo_discovery", "email_engagement"],
      q7: ["content_packaging", "clinical_search", "email_personalization"],
      q8: "change_management",
      q9: 4,
      q10: ["personalized_content", "clinical_search", "audience_growth"],
      q11: 2,
      q12: ["audience_trust", "content_archive", "clinical_context"],
      q13: ["editorial", "operations"],
      q14: "governance_playbook",
      q15: "email_engagement",
      q16: "A search and recommendation experience that understands physician intent and surfaces the right medical angle instantly.",
      q17: "Damaging trust by letting automation outpace editorial review and medical nuance.",
    },
  },
  {
    id: 4,
    name: "Avery",
    role: "Sales and commercial",
    submittedAt: "2026-03-13T15:35:00.000Z",
    answers: {
      ...sampleAnswers,
      q1: "weekly",
      q2: ["chatgpt", "gemini"],
      q3: ["commercial", "research", "analytics"],
      q4: 3,
      q5: 2,
      q6: ["sponsor_performance", "analytics_storytelling", "audience_personalization"],
      q7: ["sales_enablement", "audience_segmentation", "email_personalization"],
      q8: "measurement",
      q9: 4,
      q10: ["commercial_intelligence", "audience_growth", "personalized_content"],
      q11: 3,
      q12: ["commercial_relationships", "first_party_data", "audience_trust"],
      q13: ["sales", "leadership"],
      q14: "vendor_stack",
      q15: "lead_quality",
      q16: "A commercial intelligence layer that translates audience intent into smarter packaging, targeting, and proof for sponsors.",
      q17: "Letting new AI investments create more activity without improving client outcomes or audience value.",
    },
  },
  {
    id: 5,
    name: "Taylor",
    role: "Data and analytics",
    submittedAt: "2026-03-13T15:48:00.000Z",
    answers: {
      ...sampleAnswers,
      q1: "daily",
      q2: ["chatgpt", "perplexity", "custom_tools"],
      q3: ["analytics", "automation", "audience_targeting"],
      q4: 3,
      q5: 4,
      q6: ["audience_personalization", "analytics_storytelling", "seo_discovery"],
      q7: ["audience_segmentation", "operations_automation", "email_personalization"],
      q8: "measurement",
      q9: 5,
      q10: ["audience_growth", "personalized_content", "workflow_efficiency"],
      q11: 3,
      q12: ["first_party_data", "workflow_integration", "audience_trust"],
      q13: ["data", "product", "operations"],
      q14: "experimentation",
      q15: "repeat_visits",
      q16: "A shared audience intelligence layer that improves segmentation, testing, and packaging across editorial and commercial teams.",
      q17: "Building AI on inconsistent data and then making strategic decisions from outputs that no one fully trusts.",
    },
  },
  {
    id: 6,
    name: "Reese",
    role: "Operations and audience",
    submittedAt: "2026-03-13T16:02:00.000Z",
    answers: {
      ...sampleAnswers,
      q1: "weekly",
      q2: ["chatgpt", "gemini", "perplexity"],
      q3: ["automation", "audience_targeting", "research"],
      q4: 3,
      q5: 3,
      q6: ["email_engagement", "audience_personalization", "seo_discovery"],
      q7: ["email_personalization", "audience_segmentation", "operations_automation"],
      q8: "change_management",
      q9: 4,
      q10: ["audience_growth", "workflow_efficiency", "personalized_content"],
      q11: 4,
      q12: ["audience_trust", "first_party_data", "workflow_integration"],
      q13: ["operations", "editorial", "data"],
      q14: "change_leadership",
      q15: "email_engagement",
      q16: "A decision layer that helps us personalize audience journeys and automate recurring operational work without losing editorial quality.",
      q17: "Over-automating audience journeys in ways that make the MDLinx experience feel generic or less trustworthy.",
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
