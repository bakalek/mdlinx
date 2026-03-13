import { defaultAnswers, type QuizSubmission } from "@/lib/questions";

const mockResponses: QuizSubmission[] = [
  {
    id: 1,
    name: "Jordan",
    role: "Executive leadership",
    submittedAt: "2026-03-13T15:00:00.000Z",
    answers: {
      ...defaultAnswers,
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
      ...defaultAnswers,
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
      ...defaultAnswers,
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
  return mockResponses;
}

export async function saveResponse(submission: QuizSubmission): Promise<QuizSubmission> {
  const nextSubmission = {
    ...submission,
    id: mockResponses.length + 1,
    submittedAt: new Date().toISOString(),
  };

  mockResponses.push(nextSubmission);
  return nextSubmission;
}
