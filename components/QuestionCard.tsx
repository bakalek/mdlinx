import { Badge } from "@/components/ui/Badge";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { ScaleInput } from "@/components/ui/ScaleInput";
import { TextArea } from "@/components/ui/TextArea";
import type { QuestionDefinition, QuizDraftAnswers } from "@/lib/questions";

type QuestionCardProps = {
  question: QuestionDefinition;
  value: QuizDraftAnswers[keyof QuizDraftAnswers];
  onChange: (value: QuizDraftAnswers[keyof QuizDraftAnswers]) => void;
  error?: string;
};

export function QuestionCard({ question, value, onChange, error }: QuestionCardProps) {
  return (
    <article className="space-y-5 border border-dotted border-mdlinx-secondary/30 bg-white p-6">
      <div className="space-y-3">
        <Badge>{question.section}</Badge>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">{question.label}</p>
          <h3 className="font-serif text-2xl text-mdlinx-navy">{question.prompt}</h3>
          {question.description ? <p className="text-sm text-mdlinx-secondary">{question.description}</p> : null}
          {question.instruction && question.type !== "scale" ? (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mdlinx-secondary">{question.instruction}</p>
          ) : null}
        </div>
      </div>

      {question.type === "single" && question.options ? (
        <RadioGroup
          name={question.id}
          options={question.options}
          value={String(value)}
          onChange={(nextValue) => onChange(nextValue)}
        />
      ) : null}

      {(question.type === "multiple" || question.type === "ranking") && question.options ? (
        <div className="space-y-2">
          <CheckboxGroup
            options={question.options}
            values={Array.isArray(value) ? value : []}
            maxSelections={question.maxSelections}
            showSelectionOrder={question.type === "ranking"}
            onChange={(nextValues) => onChange(nextValues)}
          />
        </div>
      ) : null}

      {question.type === "scale" ? (
        <ScaleInput
          value={typeof value === "number" ? value : null}
          min={question.min}
          max={question.max}
          instruction={question.instruction}
          minLabel={question.scaleLabels?.min}
          maxLabel={question.scaleLabels?.max}
          onChange={(nextValue) => onChange(nextValue as QuizDraftAnswers[keyof QuizDraftAnswers])}
        />
      ) : null}

      {question.type === "text" ? (
        <TextArea
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder ?? "Share your perspective."}
        />
      ) : null}

      {error ? <p className="text-sm text-mdlinx-red">{error}</p> : null}
    </article>
  );
}
