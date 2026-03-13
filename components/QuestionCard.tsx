import { Badge } from "@/components/ui/Badge";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { ScaleInput } from "@/components/ui/ScaleInput";
import { TextArea } from "@/components/ui/TextArea";
import type { QuestionDefinition } from "@/lib/questions";

type QuestionCardProps = {
  question: QuestionDefinition;
  value: string | string[] | number;
  onChange: (value: string | string[] | number) => void;
};

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  return (
    <article className="space-y-5 border border-dotted border-mdlinx-secondary/30 bg-white p-6">
      <div className="space-y-3">
        <Badge>{question.section}</Badge>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">{question.label}</p>
          <h3 className="font-serif text-2xl text-mdlinx-navy">{question.prompt}</h3>
          {question.description ? <p className="text-sm text-mdlinx-secondary">{question.description}</p> : null}
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
        <CheckboxGroup
          options={question.options}
          values={Array.isArray(value) ? value : []}
          onChange={(nextValues) => onChange(nextValues)}
        />
      ) : null}

      {question.type === "scale" ? (
        <ScaleInput
          value={typeof value === "number" ? value : question.min ?? 1}
          min={question.min}
          max={question.max}
          onChange={(nextValue) => onChange(nextValue)}
        />
      ) : null}

      {question.type === "text" ? (
        <TextArea
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Share the most interesting thing you'd want on the table at dinner."
        />
      ) : null}
    </article>
  );
}
