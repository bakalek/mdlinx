import type { QuizSubmission } from "@/lib/questions";

type CountMap = Record<string, number>;

function countValues(values: string[]): CountMap {
  return values.reduce<CountMap>((accumulator, value) => {
    accumulator[value] = (accumulator[value] ?? 0) + 1;
    return accumulator;
  }, {});
}

export function getAverageMaturity(responses: QuizSubmission[]): number {
  if (responses.length === 0) {
    return 0;
  }

  const total = responses.reduce((sum, response) => sum + response.answers.q4, 0);
  return Number((total / responses.length).toFixed(1));
}

export function getMostCommonBarrier(responses: QuizSubmission[]): string {
  const barriers = countValues(responses.map((response) => response.answers.q6));
  return Object.entries(barriers).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "n/a";
}

export function getTopUseCase(responses: QuizSubmission[]): string {
  const priorities = countValues(responses.flatMap((response) => response.answers.q5));
  return Object.entries(priorities).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "n/a";
}

export function buildConversationStarters(responses: QuizSubmission[]): string[] {
  if (responses.length === 0) {
    return ["No responses yet. Once submissions start coming in, conversation starters will appear here."];
  }

  const averageMaturity = getAverageMaturity(responses);
  const leaders = responses.filter((response) => response.role === "Executive leadership");
  const builders = responses.filter((response) => response.role === "Product and engineering");

  const leadershipAvg = leaders.length
    ? leaders.reduce((sum, response) => sum + response.answers.q4, 0) / leaders.length
    : averageMaturity;
  const builderAvg = builders.length
    ? builders.reduce((sum, response) => sum + response.answers.q4, 0) / builders.length
    : averageMaturity;

  const maturityGap = Math.abs(leadershipAvg - builderAvg).toFixed(1);
  const barrier = getMostCommonBarrier(responses).replaceAll("_", " ");
  const useCase = getTopUseCase(responses).replaceAll("_", " ");

  return [
    `The team rates current AI maturity at ${averageMaturity}/5, with a ${maturityGap}-point gap between leadership and product/engineering.`,
    `The most common barrier is ${barrier}, which is a useful anchor for deciding what needs executive sponsorship.`,
    `The strongest near-term demand is around ${useCase}, suggesting the dinner conversation should start with practical wins before platform bets.`,
  ];
}
