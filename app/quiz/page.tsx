import { QuizForm } from "@/components/QuizForm";
import { Badge } from "@/components/ui/Badge";

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-4">
        <Badge>Respondent experience</Badge>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-mdlinx-navy">AI Readiness Quiz</h1>
          <p className="max-w-3xl text-mdlinx-secondary">
            Share how you see AI usage, opportunity, and urgency at MDLinx. This is the scaffolded flow; final copy and
            answer sets can be adjusted once the open questions are confirmed.
          </p>
        </div>
      </div>
      <QuizForm />
    </div>
  );
}
