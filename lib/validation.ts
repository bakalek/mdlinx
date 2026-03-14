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

  if (question.type === "multiple") {
    return Array.isArray(value) && value.length > 0;
  }

  if (question.type === "ranking") {
    return Array.isArray(value) && value.length === 3;
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
    return "Select exactly 3 priorities.";
  }

  if (question.type === "multiple") {
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
        q2: draft.answers.q2,
        q3: draft.answers.q3,
        q4: draft.answers.q4 as QuizAnswers["q4"],
        q5: draft.answers.q5,
        q6: draft.answers.q6 as QuizAnswers["q6"],
        q7: draft.answers.q7,
        q8: draft.answers.q8 as QuizAnswers["q8"],
        q9: draft.answers.q9 as QuizAnswers["q9"],
        q10: draft.answers.q10.trim(),
      },
    },
    errors: {},
  };
}
