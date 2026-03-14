export type UsageFrequency = "never" | "monthly" | "weekly" | "daily";
export type BarrierOption = "data_quality" | "technical_talent" | "governance" | "change_management" | "budget";
export type AdvantageOption =
  | "first_party_data"
  | "audience_trust"
  | "content_archive"
  | "distribution"
  | "domain_expertise";

export type RoleOption =
  | "Executive leadership"
  | "Editorial"
  | "Sales and marketing"
  | "Product and engineering"
  | "Data and analytics"
  | "Operations";

export type QuizAnswers = {
  q1: UsageFrequency;
  q2: string[];
  q3: string[];
  q4: 1 | 2 | 3 | 4 | 5;
  q5: string[];
  q6: BarrierOption;
  q7: string[];
  q8: 1 | 2 | 3 | 4 | 5;
  q9: AdvantageOption;
  q10: string;
};

export type QuizDraftAnswers = {
  q1: UsageFrequency | "";
  q2: string[];
  q3: string[];
  q4: 1 | 2 | 3 | 4 | 5 | null;
  q5: string[];
  q6: BarrierOption | "";
  q7: string[];
  q8: 1 | 2 | 3 | 4 | 5 | null;
  q9: AdvantageOption | "";
  q10: string;
};

export type QuizSubmission = {
  id?: number;
  name: string;
  role: RoleOption;
  answers: QuizAnswers;
  submittedAt?: string;
};

export type QuestionType = "single" | "multiple" | "ranking" | "scale" | "text";

export type QuestionDefinition = {
  id: keyof QuizAnswers;
  section: "Current state" | "Maturity" | "Strategy" | "Open input";
  label: string;
  prompt: string;
  description?: string;
  type: QuestionType;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
};

export const roles: RoleOption[] = [
  "Executive leadership",
  "Editorial",
  "Sales and marketing",
  "Product and engineering",
  "Data and analytics",
  "Operations",
];

export const questions: QuestionDefinition[] = [
  {
    id: "q1",
    section: "Current state",
    label: "Q1",
    prompt: "How often do you personally use AI tools in your work?",
    type: "single",
    options: [
      { value: "never", label: "Never" },
      { value: "monthly", label: "A few times a month" },
      { value: "weekly", label: "A few times a week" },
      { value: "daily", label: "Daily" },
    ],
  },
  {
    id: "q2",
    section: "Current state",
    label: "Q2",
    prompt: "Which AI tools have you used in the last 90 days?",
    type: "multiple",
    options: [
      { value: "chatgpt", label: "ChatGPT" },
      { value: "claude", label: "Claude" },
      { value: "copilot", label: "GitHub Copilot" },
      { value: "gemini", label: "Gemini" },
      { value: "perplexity", label: "Perplexity" },
    ],
  },
  {
    id: "q3",
    section: "Current state",
    label: "Q3",
    prompt: "Where do you already see AI delivering value?",
    type: "multiple",
    options: [
      { value: "research", label: "Research and synthesis" },
      { value: "automation", label: "Workflow automation" },
      { value: "content_creation", label: "Content creation" },
      { value: "analysis", label: "Data analysis" },
      { value: "coding", label: "Code generation" },
    ],
  },
  {
    id: "q4",
    section: "Maturity",
    label: "Q4",
    prompt: "How would you rate MDLinx's current AI maturity?",
    description: "1 is exploratory. 5 is operationalized across teams.",
    type: "scale",
    min: 1,
    max: 5,
  },
  {
    id: "q5",
    section: "Maturity",
    label: "Q5",
    prompt: "Which business areas should AI improve first?",
    type: "multiple",
    options: [
      { value: "content_creation", label: "Content creation" },
      { value: "internal_productivity", label: "Internal productivity" },
      { value: "audience_personalization", label: "Audience personalization" },
      { value: "sales_enablement", label: "Sales enablement" },
      { value: "advertiser_products", label: "Advertiser products" },
    ],
  },
  {
    id: "q6",
    section: "Maturity",
    label: "Q6",
    prompt: "What is the biggest barrier to AI progress right now?",
    type: "single",
    options: [
      { value: "data_quality", label: "Data quality and access" },
      { value: "technical_talent", label: "Technical talent" },
      { value: "governance", label: "Governance and compliance" },
      { value: "change_management", label: "Change management" },
      { value: "budget", label: "Budget and prioritization" },
    ],
  },
  {
    id: "q7",
    section: "Strategy",
    label: "Q7",
    prompt: "Pick the top 3 strategic AI priorities for the next 12 months.",
    description: "Select exactly three. The order you click becomes the rough priority order.",
    type: "ranking",
    options: [
      { value: "personalized_content", label: "Personalized content" },
      { value: "internal_efficiency", label: "Internal efficiency" },
      { value: "new_ai_features", label: "New AI-powered products" },
      { value: "advertiser_intelligence", label: "Advertiser intelligence" },
      { value: "clinical_search", label: "Clinical search improvements" },
    ],
  },
  {
    id: "q8",
    section: "Strategy",
    label: "Q8",
    prompt: "How urgent is AI disruption for MDLinx over the next 24 months?",
    type: "scale",
    min: 1,
    max: 5,
  },
  {
    id: "q9",
    section: "Strategy",
    label: "Q9",
    prompt: "What strategic advantage is most defensible for MDLinx in an AI market?",
    type: "single",
    options: [
      { value: "first_party_data", label: "First-party data" },
      { value: "audience_trust", label: "Audience trust" },
      { value: "content_archive", label: "Content archive" },
      { value: "distribution", label: "Distribution footprint" },
      { value: "domain_expertise", label: "Domain expertise" },
    ],
  },
  {
    id: "q10",
    section: "Open input",
    label: "Q10",
    prompt: "If you had a magic wand, what AI capability would you want MDLinx to launch first?",
    type: "text",
  },
];

export const emptyDraftAnswers: QuizDraftAnswers = {
  q1: "",
  q2: [],
  q3: [],
  q4: null,
  q5: [],
  q6: "",
  q7: [],
  q8: null,
  q9: "",
  q10: "",
};

export const sampleAnswers: QuizAnswers = {
  q1: "weekly",
  q2: [],
  q3: [],
  q4: 3,
  q5: [],
  q6: "technical_talent",
  q7: [],
  q8: 3,
  q9: "first_party_data",
  q10: "",
};

export const sectionOrder: QuestionDefinition["section"][] = [
  "Current state",
  "Maturity",
  "Strategy",
  "Open input",
];
