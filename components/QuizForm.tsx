"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { emptyDraftAnswers, questions, roles, sectionOrder, sections } from "@/lib/questions";
import { getStepErrors, isStepValid, parseQuizSubmission, type DraftQuizSubmission } from "@/lib/validation";

const stepSections = ["Respondent info", ...sectionOrder];

export function QuizForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState<(typeof roles)[number] | "">("");
  const [answers, setAnswers] = useState(emptyDraftAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const totalSteps = stepSections.length;
  const draft: DraftQuizSubmission = { name, role, answers };

  const currentQuestions = useMemo(() => {
    const currentSection = sectionOrder[step - 1];
    return questions.filter((question) => question.section === currentSection);
  }, [step]);
  const currentSectionMeta = useMemo(() => sections.find((section) => section.id === sectionOrder[step - 1]), [step]);
  const currentErrors = getStepErrors(step, draft);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function handleNextStep() {
    if (!isStepValid(step, draft)) {
      setShowValidation(true);
      return;
    }

    setShowValidation(false);
    setStep((currentStep) => Math.min(currentStep + 1, totalSteps - 1));
  }

  async function handleSubmit() {
    const parsedSubmission = parseQuizSubmission(draft);

    if (!parsedSubmission.data) {
      setShowValidation(true);
      setSubmissionError("Complete every required question before submitting.");
      return;
    }

    setSubmitting(true);
    setSubmissionError("");
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedSubmission.data),
    });
    setSubmitting(false);

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setSubmissionError(body?.error ?? "Unable to submit the quiz right now.");
      return;
    }

    router.push("/thank-you");
  }

  return (
    <div className="space-y-8">
      <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />

      {step === 0 ? (
        <section className="space-y-6 border border-dotted border-mdlinx-secondary/30 bg-white p-5 sm:p-6">
          <Badge>Respondent</Badge>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-mdlinx-secondary">
              <span>Name</span>
              <input
                className="w-full border border-mdlinx-secondary/30 px-4 py-3 text-mdlinx-body outline-none focus:border-mdlinx-teal"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setSubmissionError("");
                }}
                placeholder="Your name"
              />
              {showValidation && currentErrors.name ? <p className="text-sm text-mdlinx-red">{currentErrors.name}</p> : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-mdlinx-secondary">
              <span>Role</span>
              <select
                className="w-full border border-mdlinx-secondary/30 px-4 py-3 text-mdlinx-body outline-none focus:border-mdlinx-teal"
                value={role}
                onChange={(event) => {
                  setRole(event.target.value as typeof role);
                  setSubmissionError("");
                }}
              >
                <option value="">Select your role</option>
                {roles.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
              {showValidation && currentErrors.role ? <p className="text-sm text-mdlinx-red">{currentErrors.role}</p> : null}
            </label>
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          {currentSectionMeta ? (
            <div className="space-y-3 border border-dotted border-mdlinx-secondary/30 bg-white p-5 sm:p-6">
              <Badge>{currentSectionMeta.title}</Badge>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl text-mdlinx-navy sm:text-3xl">{currentSectionMeta.title}</h2>
                <p className="text-sm leading-7 text-mdlinx-secondary sm:text-base">{currentSectionMeta.description}</p>
              </div>
            </div>
          ) : null}
          {currentQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) =>
                {
                  setSubmissionError("");
                  setAnswers((currentAnswers) => ({
                    ...currentAnswers,
                    [question.id]: value,
                  }));
                }
              }
              error={showValidation ? currentErrors[question.id] : undefined}
            />
          ))}
        </section>
      )}

      {submissionError ? <p className="text-sm text-mdlinx-red">{submissionError}</p> : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setShowValidation(false);
            setSubmissionError("");
            setStep((currentStep) => Math.max(currentStep - 1, 0));
          }}
        >
          Back
        </Button>

        {step < totalSteps - 1 ? (
          <Button type="button" onClick={handleNextStep} className="w-full sm:w-auto">
            Next
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={submitting} className="w-full sm:w-auto">
            {submitting ? "Submitting..." : "Submit responses"}
          </Button>
        )}
      </div>
    </div>
  );
}
