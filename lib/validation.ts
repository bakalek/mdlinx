import {
  questions,
  sectionOrder,
  type QuestionDefinition,
  type QuizAnswers,
  type QuizDraftAnswers,
  type QuizSubmission,
  type RoleOption,
} from "@/lib/questions";

export type DraftQuizSubmission = {
  name: string;
  role: RoleOption | "";
  answers: QuizDraftAnswers;
};

export type ValidationErrors = Partial<Record<keyof QuizAnswers | "name" | "role", string>>;

export function isQuestionAnswered(question: QuestionDefinition, value: QuizDraftAnswers[keyof QuizDraftAnswers]) {
  if (question.type === "single") {
    return typeof value === "string" && value.length > 0;
  }

  if (question.type === "multiple" || question.type === "ranking") {
    if (!Array.isArray(value)) {
      return false;
    }

    if (typeof question.minSelections === "number" && value.length < question.minSelections) {
      return false;
    }

    if (typeof question.maxSelections === "number" && value.length > question.maxSelections) {
      return false;
    }

    return value.length > 0;
  }

  if (question.type === "scale") {
    return typeof value === "number";
  }

  if (question.type === "text") {
    return typeof value === "string" && value.trim().length > 0;
  }

  return false;
}

export function getQuestionError(
  question: QuestionDefinition,
  value: QuizDraftAnswers[keyof QuizDraftAnswers],
): string | null {
  if (isQuestionAnswered(question, value)) {
    return null;
  }

  if (question.type === "ranking") {
    const exactCount =
      typeof question.minSelections === "number" && question.minSelections === question.maxSelections
        ? question.minSelections
        : null;

    return exactCount ? `Select exactly ${exactCount} priorities.` : "Complete the ranking to continue.";
  }

  if (question.type === "multiple") {
    if (typeof question.minSelections === "number" && question.minSelections > 1) {
      return `Select at least ${question.minSelections} options.`;
    }

    return "Select at least one option.";
  }

  if (question.type === "text") {
    return "This response is required.";
  }

  return "Choose one option to continue.";
}

export function validateDraftSubmission(draft: DraftQuizSubmission): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!draft.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!draft.role) {
    errors.role = "Role is required.";
  }

  for (const question of questions) {
    const error = getQuestionError(question, draft.answers[question.id]);
    if (error) {
      errors[question.id] = error;
    }
  }

  return errors;
}

export function isStepValid(step: number, draft: DraftQuizSubmission) {
  if (step === 0) {
    return Boolean(draft.name.trim() && draft.role);
  }

  const section = sectionOrder[step - 1];
  const sectionQuestions = questions.filter((question) => question.section === section);
  return sectionQuestions.every((question) => !getQuestionError(question, draft.answers[question.id]));
}

export function getStepErrors(step: number, draft: DraftQuizSubmission): ValidationErrors {
  const errors = validateDraftSubmission(draft);

  if (step === 0) {
    return {
      name: errors.name,
      role: errors.role,
    };
  }

  const section = sectionOrder[step - 1];
  const sectionQuestions = questions.filter((question) => question.section === section);

  return sectionQuestions.reduce<ValidationErrors>((accumulator, question) => {
    if (errors[question.id]) {
      accumulator[question.id] = errors[question.id];
    }
    return accumulator;
  }, {});
}

export function parseQuizSubmission(draft: DraftQuizSubmission): { data: QuizSubmission | null; errors: ValidationErrors } {
  const errors = validateDraftSubmission(draft);

  if (Object.keys(errors).length > 0) {
    return { data: null, errors };
  }

  return {
    data: {
      name: draft.name.trim(),
      role: draft.role as RoleOption,
      answers: {
        q1: draft.answers.q1 as QuizAnswers["q1"],
        q2: draft.answers.q2 as QuizAnswers["q2"],
        q3: draft.answers.q3 as QuizAnswers["q3"],
        q4: draft.answers.q4 as QuizAnswers["q4"],
        q5: draft.answers.q5 as QuizAnswers["q5"],
        q6: draft.answers.q6 as QuizAnswers["q6"],
        q7: draft.answers.q7 as QuizAnswers["q7"],
        q8: draft.answers.q8 as QuizAnswers["q8"],
        q9: draft.answers.q9 as QuizAnswers["q9"],
        q10: draft.answers.q10 as QuizAnswers["q10"],
        q11: draft.answers.q11 as QuizAnswers["q11"],
        q12: draft.answers.q12 as QuizAnswers["q12"],
        q13: draft.answers.q13 as QuizAnswers["q13"],
        q14: draft.answers.q14 as QuizAnswers["q14"],
        q15: draft.answers.q15 as QuizAnswers["q15"],
        q16: draft.answers.q16.trim(),
        q17: draft.answers.q17.trim(),
      },
    },
    errors: {},
  };
}
