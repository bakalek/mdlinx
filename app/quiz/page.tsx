import { QuizForm } from "@/components/QuizForm";
import { Badge } from "@/components/ui/Badge";

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-4">
        <Badge>Assessment</Badge>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-mdlinx-navy">MDLinx AI and Media Strategy Assessment</h1>
          <p className="max-w-3xl text-mdlinx-secondary">
            Share how you see AI adoption, publishing pressure, audience opportunity, and operating readiness at MDLinx.
            The assessment is designed to create a sharper strategic picture, not just a simple AI pulse check.
          </p>
        </div>
      </div>
      <QuizForm />
    </div>
  );
}
