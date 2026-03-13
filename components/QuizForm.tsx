"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { defaultAnswers, questions, roles, sectionOrder, type QuizAnswers, type QuizSubmission } from "@/lib/questions";

const stepSections = ["Respondent info", ...sectionOrder];

export function QuizForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const [submitting, setSubmitting] = useState(false);
  const totalSteps = stepSections.length;

  const currentQuestions = useMemo(() => {
    const currentSection = sectionOrder[step - 1];
    return questions.filter((question) => question.section === currentSection);
  }, [step]);

  async function handleSubmit() {
    const payload: QuizSubmission = { name, role, answers };

    setSubmitting(true);
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSubmitting(false);

    if (!response.ok) {
      return;
    }

    router.push("/thank-you");
  }

  return (
    <div className="space-y-8">
      <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />

      {step === 0 ? (
        <section className="space-y-6 border border-dotted border-mdlinx-secondary/30 bg-white p-6">
          <Badge>Respondent</Badge>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-mdlinx-secondary">
              <span>Name</span>
              <input
                className="w-full border border-mdlinx-secondary/30 px-4 py-3 text-mdlinx-body outline-none focus:border-mdlinx-teal"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-mdlinx-secondary">
              <span>Role</span>
              <select
                className="w-full border border-mdlinx-secondary/30 px-4 py-3 text-mdlinx-body outline-none focus:border-mdlinx-teal"
                value={role}
                onChange={(event) => setRole(event.target.value as typeof role)}
              >
                {roles.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          {currentQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) =>
                setAnswers((currentAnswers) => ({
                  ...currentAnswers,
                  [question.id]: value,
                }))
              }
            />
          ))}
        </section>
      )}

      <div className="flex items-center justify-between">
        <Button type="button" variant="secondary" onClick={() => setStep((currentStep) => Math.max(currentStep - 1, 0))}>
          Back
        </Button>

        {step < totalSteps - 1 ? (
          <Button
            type="button"
            onClick={() => setStep((currentStep) => Math.min(currentStep + 1, totalSteps - 1))}
            disabled={step === 0 && (!name.trim() || !role)}
          >
            Next
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={submitting || !name.trim()}>
            {submitting ? "Submitting..." : "Submit responses"}
          </Button>
        )}
      </div>
    </div>
  );
}
