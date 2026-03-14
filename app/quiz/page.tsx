import { QuizForm } from "@/components/QuizForm";
import { Badge } from "@/components/ui/Badge";

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-3">
        <Badge>Assessment</Badge>
        <h1 className="font-serif text-3xl text-mdlinx-navy sm:text-4xl">MDLinx AI and Media Strategy Assessment</h1>
      </div>
      <QuizForm />
    </div>
  );
}
