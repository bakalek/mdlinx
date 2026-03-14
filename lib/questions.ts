export type ScaleAnswer = 1 | 2 | 3 | 4 | 5;
export type UsageFrequency = "never" | "monthly" | "weekly" | "daily";

export type RoleOption =
  | "Executive leadership"
  | "Editorial and content"
  | "Sales and commercial"
  | "Product and engineering"
  | "Data and analytics"
  | "Operations and audience";

export type SectionKey =
  | "AI adoption"
  | "Publishing and audience"
  | "Operating readiness"
  | "Strategy and investment"
  | "Open perspective";

export type QuizAnswers = {
  q1: UsageFrequency;
  q2: string[];
  q3: string[];
  q4: ScaleAnswer;
  q5: ScaleAnswer;
  q6: string[];
  q7: string[];
  q8: string;
  q9: ScaleAnswer;
  q10: string[];
  q11: ScaleAnswer;
  q12: string[];
  q13: string[];
  q14: string;
  q15: string;
  q16: string;
  q17: string;
};

export type QuizDraftAnswers = {
  [K in keyof QuizAnswers]: QuizAnswers[K] extends ScaleAnswer
    ? ScaleAnswer | null
    : QuizAnswers[K] extends string[]
      ? string[]
      : QuizAnswers[K] | "";
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
  section: SectionKey;
  label: string;
  prompt: string;
  description?: string;
  instruction?: string;
  placeholder?: string;
  type: QuestionType;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  minSelections?: number;
  maxSelections?: number;
  scaleLabels?: {
    min: string;
    max: string;
  };
};

export const roles: RoleOption[] = [
  "Executive leadership",
  "Editorial and content",
  "Sales and commercial",
  "Product and engineering",
  "Data and analytics",
  "Operations and audience",
];

export const sections: { id: SectionKey; title: string; description: string }[] = [
  {
    id: "AI adoption",
    title: "Current AI adoption",
    description: "How widely AI is used today across MDLinx workflows, teams, and tool choices.",
  },
  {
    id: "Publishing and audience",
    title: "Publishing and audience pressure",
    description: "Where audience expectations, editorial quality, and commercialization challenges are showing up most clearly.",
  },
  {
    id: "Operating readiness",
    title: "Operating readiness",
    description: "How strong the underlying data, governance, trust, and pilot capacity really are.",
  },
  {
    id: "Strategy and investment",
    title: "Strategy and investment",
    description: "What MDLinx should prioritize first, which metrics matter, and where competitive urgency is highest.",
  },
  {
    id: "Open perspective",
    title: "Open perspective",
    description: "What the team believes MDLinx should build, protect, or change next.",
  },
];

export const questions: QuestionDefinition[] = [
  {
    id: "q1",
    section: "AI adoption",
    label: "Q1",
    prompt: "How often do you personally use AI tools in your work today?",
    description: "Think about your current weekly workflow, not just experimentation.",
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
    section: "AI adoption",
    label: "Q2",
    prompt: "Which AI tools or platforms have you used in the last 90 days?",
    description: "Select all that apply.",
    type: "multiple",
    minSelections: 1,
    options: [
      { value: "chatgpt", label: "ChatGPT" },
      { value: "claude", label: "Claude" },
      { value: "copilot", label: "GitHub Copilot" },
      { value: "gemini", label: "Gemini" },
      { value: "perplexity", label: "Perplexity" },
      { value: "custom_tools", label: "Internal or vendor-specific tools" },
    ],
  },
  {
    id: "q3",
    section: "AI adoption",
    label: "Q3",
    prompt: "Where do you already see AI creating value for MDLinx?",
    description: "Select the areas where the signal already feels real.",
    type: "multiple",
    minSelections: 1,
    options: [
      { value: "research", label: "Research and synthesis" },
      { value: "content_creation", label: "Content drafting and packaging" },
      { value: "audience_targeting", label: "Audience targeting and personalization" },
      { value: "automation", label: "Workflow automation" },
      { value: "analytics", label: "Analytics and reporting" },
      { value: "commercial", label: "Commercial and advertiser support" },
    ],
  },
  {
    id: "q4",
    section: "Operating readiness",
    label: "Q4",
    prompt: "How mature is MDLinx today in applying AI across content, audience, and operations?",
    description: "Rate the organization as it exists today, not the aspiration.",
    instruction: "Choose one number from 1 to 5.",
    type: "scale",
    min: 1,
    max: 5,
    scaleLabels: {
      min: "1 = exploratory and fragmented",
      max: "5 = repeatable and operationalized",
    },
  },
  {
    id: "q5",
    section: "Operating readiness",
    label: "Q5",
    prompt: "How prepared is MDLinx's data foundation for AI-driven targeting, segmentation, and decision-making?",
    description: "Consider data quality, accessibility, structure, and consistency.",
    instruction: "Choose one number from 1 to 5.",
    type: "scale",
    min: 1,
    max: 5,
    scaleLabels: {
      min: "1 = hard to trust or activate",
      max: "5 = structured, accessible, and activation-ready",
    },
  },
  {
    id: "q6",
    section: "Publishing and audience",
    label: "Q6",
    prompt: "Which media and publishing workflows feel under the most pressure right now?",
    description: "Select the workflows where AI and market changes are creating the most urgency.",
    type: "multiple",
    minSelections: 1,
    options: [
      { value: "editorial_velocity", label: "Editorial production velocity" },
      { value: "seo_discovery", label: "Search and discovery" },
      { value: "email_engagement", label: "Email engagement and retention" },
      { value: "audience_personalization", label: "Audience personalization" },
      { value: "sponsor_performance", label: "Sponsor and advertiser performance" },
      { value: "analytics_storytelling", label: "Reporting and performance storytelling" },
    ],
  },
  {
    id: "q7",
    section: "Publishing and audience",
    label: "Q7",
    prompt: "Which MDLinx opportunities are the best fit for AI in the next 12 months?",
    description: "Select all the areas where AI could create the clearest value for the business.",
    type: "multiple",
    minSelections: 1,
    options: [
      { value: "clinical_search", label: "Clinical search and content discovery" },
      { value: "content_packaging", label: "Content packaging and repurposing" },
      { value: "email_personalization", label: "Email and on-site personalization" },
      { value: "audience_segmentation", label: "Audience segmentation and targeting" },
      { value: "sales_enablement", label: "Sales intelligence and pitch support" },
      { value: "operations_automation", label: "Internal workflow automation" },
    ],
  },
  {
    id: "q8",
    section: "Operating readiness",
    label: "Q8",
    prompt: "What is the single biggest factor slowing AI progress at MDLinx?",
    type: "single",
    options: [
      { value: "data_quality", label: "Data quality and activation" },
      { value: "technical_talent", label: "Technical talent and implementation capacity" },
      { value: "governance", label: "Governance, compliance, or brand risk" },
      { value: "change_management", label: "Change management and adoption" },
      { value: "budget", label: "Budget, focus, or prioritization" },
      { value: "measurement", label: "Measurement and business-case clarity" },
    ],
  },
  {
    id: "q9",
    section: "Strategy and investment",
    label: "Q9",
    prompt: "How urgent is the threat from AI-native competitors, changing search behavior, and shifting audience habits?",
    description: "Rate the external pressure on MDLinx's current publishing and commercialization model.",
    instruction: "Choose one number from 1 to 5.",
    type: "scale",
    min: 1,
    max: 5,
    scaleLabels: {
      min: "1 = low near-term pressure",
      max: "5 = high near-term disruption risk",
    },
  },
  {
    id: "q10",
    section: "Strategy and investment",
    label: "Q10",
    prompt: "Pick the top 3 audience and product priorities MDLinx should push first.",
    description: "Select exactly three. The order you click becomes the rough priority order.",
    type: "ranking",
    minSelections: 3,
    maxSelections: 3,
    options: [
      { value: "personalized_content", label: "Personalized content experiences" },
      { value: "clinical_search", label: "Smarter clinical search and navigation" },
      { value: "commercial_intelligence", label: "Advertiser and sponsor intelligence" },
      { value: "workflow_efficiency", label: "Internal workflow efficiency" },
      { value: "new_products", label: "New AI-powered products or features" },
      { value: "audience_growth", label: "Audience growth and retention" },
    ],
  },
  {
    id: "q11",
    section: "Operating readiness",
    label: "Q11",
    prompt: "How confident are you that MDLinx can use AI while preserving editorial trust, medical credibility, and audience quality?",
    description: "Rate confidence in balancing speed with trust.",
    instruction: "Choose one number from 1 to 5.",
    type: "scale",
    min: 1,
    max: 5,
    scaleLabels: {
      min: "1 = low confidence",
      max: "5 = high confidence",
    },
  },
  {
    id: "q12",
    section: "Strategy and investment",
    label: "Q12",
    prompt: "Which signals give MDLinx the strongest durable advantage in an AI-shaped market?",
    description: "Select all that feel truly defensible.",
    type: "multiple",
    minSelections: 1,
    options: [
      { value: "audience_trust", label: "Audience trust and brand credibility" },
      { value: "first_party_data", label: "First-party audience and intent data" },
      { value: "content_archive", label: "Depth of medical content and archive value" },
      { value: "clinical_context", label: "Understanding physician context and needs" },
      { value: "commercial_relationships", label: "Commercial and advertiser relationships" },
      { value: "workflow_integration", label: "Workflow integration into the customer journey" },
    ],
  },
  {
    id: "q13",
    section: "Operating readiness",
    label: "Q13",
    prompt: "Which teams look most ready to pilot meaningful AI changes in the next 6 months?",
    description: "Select the groups that could move first with the right support.",
    type: "multiple",
    minSelections: 1,
    options: [
      { value: "editorial", label: "Editorial and content" },
      { value: "sales", label: "Sales and commercial" },
      { value: "product", label: "Product and engineering" },
      { value: "data", label: "Data and analytics" },
      { value: "operations", label: "Operations and audience" },
      { value: "leadership", label: "Leadership and cross-functional strategy" },
    ],
  },
  {
    id: "q14",
    section: "Strategy and investment",
    label: "Q14",
    prompt: "Which capability gap would accelerate progress the fastest if MDLinx solved it next?",
    type: "single",
    options: [
      { value: "ai_product_talent", label: "AI product and implementation talent" },
      { value: "data_activation", label: "Audience data activation and measurement" },
      { value: "governance_playbook", label: "Governance and editorial policy playbook" },
      { value: "change_leadership", label: "Cross-functional change leadership" },
      { value: "vendor_stack", label: "Better vendor stack and integrations" },
      { value: "experimentation", label: "Faster experimentation and pilot discipline" },
    ],
  },
  {
    id: "q15",
    section: "Strategy and investment",
    label: "Q15",
    prompt: "If AI is working well, which business metric should move first?",
    type: "single",
    options: [
      { value: "repeat_visits", label: "Repeat visits and audience retention" },
      { value: "email_engagement", label: "Email engagement" },
      { value: "content_output", label: "Content output and packaging speed" },
      { value: "sponsor_performance", label: "Sponsor or advertiser performance" },
      { value: "lead_quality", label: "Lead quality and commercial efficiency" },
      { value: "ops_efficiency", label: "Operational efficiency" },
    ],
  },
  {
    id: "q16",
    section: "Open perspective",
    label: "Q16",
    prompt: "What is the most valuable AI plus media opportunity MDLinx should pursue next?",
    description: "Describe the opportunity in business terms, not just technology terms.",
    type: "text",
    placeholder: "Example: a physician-intent engine that improves search, content packaging, and sponsor targeting at the same time.",
  },
  {
    id: "q17",
    section: "Open perspective",
    label: "Q17",
    prompt: "What is the biggest risk if MDLinx gets AI strategy wrong?",
    description: "Call out the failure mode you worry about most.",
    type: "text",
    placeholder: "Example: losing audience trust with low-quality automation, or moving too slowly while search behavior changes around us.",
  },
];

export const emptyDraftAnswers: QuizDraftAnswers = {
  q1: "",
  q2: [],
  q3: [],
  q4: null,
  q5: null,
  q6: [],
  q7: [],
  q8: "",
  q9: null,
  q10: [],
  q11: null,
  q12: [],
  q13: [],
  q14: "",
  q15: "",
  q16: "",
  q17: "",
};

export const sampleAnswers: QuizAnswers = {
  q1: "weekly",
  q2: ["chatgpt"],
  q3: ["research"],
  q4: 3,
  q5: 3,
  q6: ["editorial_velocity"],
  q7: ["clinical_search"],
  q8: "technical_talent",
  q9: 3,
  q10: ["personalized_content", "workflow_efficiency", "new_products"],
  q11: 3,
  q12: ["audience_trust"],
  q13: ["product"],
  q14: "ai_product_talent",
  q15: "repeat_visits",
  q16: "",
  q17: "",
};

export const sectionOrder: SectionKey[] = sections.map((section) => section.id);

export const questionMap = Object.fromEntries(questions.map((question) => [question.id, question])) as Record<
  QuestionDefinition["id"],
  QuestionDefinition
>;

export function getOptionLabel(questionId: QuestionDefinition["id"], value: string) {
  return questionMap[questionId].options?.find((option) => option.value === value)?.label ?? value.replaceAll("_", " ");
}
