import { getOptionLabel, type QuizSubmission } from "@/lib/questions";

export type CountDatum = {
  label: string;
  value: number;
};

export type DashboardSnapshot = {
  totalResponses: number;
  readinessIndex: number;
  averageDisruption: number;
  averageTrust: number;
  topConstraint: string;
  topPriority: string;
  topMetric: string;
  usageData: CountDatum[];
  toolData: CountDatum[];
  workflowPressureData: CountDatum[];
  opportunityData: CountDatum[];
  priorityData: CountDatum[];
  durableEdgeData: CountDatum[];
  pilotReadinessData: CountDatum[];
  capabilityGapData: CountDatum[];
  responseUrgencyData: { name: string; role: string; urgency: number }[];
  capabilityGapByRole: { role: string; barrier: string }[];
  openOpportunityThemes: string[];
  openRiskThemes: string[];
  strategicSignals: string[];
};

type SingleQuestionId = "q1" | "q8" | "q14" | "q15";
type MultiQuestionId = "q2" | "q3" | "q6" | "q7" | "q10" | "q12" | "q13";
type ScaleQuestionId = "q4" | "q5" | "q9" | "q11";

function countValues(values: string[]): CountDatum[] {
  return Object.entries(
    values.reduce<Record<string, number>>((accumulator, value) => {
      accumulator[value] = (accumulator[value] ?? 0) + 1;
      return accumulator;
    }, {}),
  )
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function countSingleQuestion(responses: QuizSubmission[], questionId: SingleQuestionId): CountDatum[] {
  return countValues(responses.map((response) => getOptionLabel(questionId, response.answers[questionId])));
}

function countMultiQuestion(responses: QuizSubmission[], questionId: MultiQuestionId): CountDatum[] {
  return countValues(responses.flatMap((response) => response.answers[questionId].map((value) => getOptionLabel(questionId, value))));
}

function averageScale(responses: QuizSubmission[], questionId: ScaleQuestionId): number {
  if (responses.length === 0) {
    return 0;
  }

  const total = responses.reduce((sum, response) => sum + response.answers[questionId], 0);
  return Number((total / responses.length).toFixed(1));
}

function buildWeightedRanking(responses: QuizSubmission[], questionId: "q10"): CountDatum[] {
  const weights = [3, 2, 1];
  const totals = responses.reduce<Record<string, number>>((accumulator, response) => {
    response.answers[questionId].forEach((value, index) => {
      accumulator[value] = (accumulator[value] ?? 0) + (weights[index] ?? 1);
    });

    return accumulator;
  }, {});

  return Object.entries(totals)
    .map(([value, total]) => ({ label: getOptionLabel(questionId, value), value: total }))
    .sort((a, b) => b.value - a.value);
}

function topLabel(data: CountDatum[]) {
  return data[0]?.label ?? "n/a";
}

function toThemeTokens(text: string) {
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 5);
}

function buildThemeCloud(items: string[]) {
  return countValues(items)
    .slice(0, 12)
    .map((item) => item.label);
}

export function buildConversationStarters(responses: QuizSubmission[]): string[] {
  if (responses.length === 0) {
    return ["No responses yet. Once submissions arrive, the dashboard will summarize patterns across roles, priorities, and publishing pressure."];
  }

  const readinessIndex = Number(((averageScale(responses, "q4") + averageScale(responses, "q5") + averageScale(responses, "q11")) / 3).toFixed(1));
  const urgency = averageScale(responses, "q9");
  const topConstraint = topLabel(countSingleQuestion(responses, "q8"));
  const topPriority = topLabel(buildWeightedRanking(responses, "q10"));
  const topMetric = topLabel(countSingleQuestion(responses, "q15"));

  const leadershipResponses = responses.filter((response) => response.role === "Executive leadership");
  const editorialResponses = responses.filter((response) => response.role === "Editorial and content");
  const leadershipUrgency = leadershipResponses.length ? averageScale(leadershipResponses, "q9") : urgency;
  const editorialTrust = editorialResponses.length ? averageScale(editorialResponses, "q11") : averageScale(responses, "q11");
  const disruptionGap = Math.abs(leadershipUrgency - urgency).toFixed(1);

  return [
    `The composite readiness index is ${readinessIndex}/5, which suggests MDLinx sees real opportunity but not yet a fully repeatable operating model.`,
    `The biggest self-reported blocker is ${topConstraint}, which makes it the clearest leverage point for near-term execution.`,
    `The strongest ranked priority is ${topPriority}, so the team is leaning toward visible audience or product outcomes rather than abstract experimentation.`,
    `The first metric people want AI to move is ${topMetric}, which is useful guidance for pilot design and measurement.`,
    `Leadership's disruption urgency differs from the overall average by ${disruptionGap} points, while editorial trust confidence sits at ${editorialTrust}/5, which may indicate a tension between speed and quality.`,
  ];
}

export function buildDashboardSnapshot(responses: QuizSubmission[]): DashboardSnapshot {
  const usageData = countSingleQuestion(responses, "q1");
  const toolData = countMultiQuestion(responses, "q2");
  const workflowPressureData = countMultiQuestion(responses, "q6");
  const opportunityData = countMultiQuestion(responses, "q7");
  const priorityData = buildWeightedRanking(responses, "q10");
  const durableEdgeData = countMultiQuestion(responses, "q12");
  const pilotReadinessData = countMultiQuestion(responses, "q13");
  const capabilityGapData = countSingleQuestion(responses, "q14");

  return {
    totalResponses: responses.length,
    readinessIndex:
      responses.length === 0
        ? 0
        : Number(((averageScale(responses, "q4") + averageScale(responses, "q5") + averageScale(responses, "q11")) / 3).toFixed(1)),
    averageDisruption: averageScale(responses, "q9"),
    averageTrust: averageScale(responses, "q11"),
    topConstraint: topLabel(countSingleQuestion(responses, "q8")),
    topPriority: topLabel(priorityData),
    topMetric: topLabel(countSingleQuestion(responses, "q15")),
    usageData,
    toolData,
    workflowPressureData,
    opportunityData,
    priorityData,
    durableEdgeData,
    pilotReadinessData,
    capabilityGapData,
    responseUrgencyData: responses.map((response) => ({
      name: response.name,
      role: response.role,
      urgency: response.answers.q9,
    })),
    capabilityGapByRole: responses.map((response) => ({
      role: response.role,
      barrier: getOptionLabel("q14", response.answers.q14),
    })),
    openOpportunityThemes: buildThemeCloud(responses.flatMap((response) => toThemeTokens(response.answers.q16))),
    openRiskThemes: buildThemeCloud(responses.flatMap((response) => toThemeTokens(response.answers.q17))),
    strategicSignals: buildConversationStarters(responses),
  };
}
