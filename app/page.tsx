import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <section className="space-y-6">
        <Badge>Assessment</Badge>
        <div className="space-y-5">
          <h1 className="max-w-2xl font-serif text-3xl leading-tight text-mdlinx-navy sm:text-4xl lg:text-5xl">
            Where AI, publishing pressure, and audience strategy intersect at MDLinx.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-mdlinx-secondary sm:text-lg sm:leading-8">
            This assessment is designed to take about 8 to 10 minutes. It covers AI adoption, editorial and audience
            pressure, operating readiness, and the strategic moves that matter most for a healthcare media business.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/quiz">
            <Button>Start assessment</Button>
          </Link>
        </div>
      </section>

      <aside className="space-y-5 border border-dotted border-mdlinx-secondary/30 bg-white p-6 shadow-panel sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">What this captures</p>
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-mdlinx-navy sm:text-3xl">A clearer MDLinx strategy signal</h2>
          <ul className="space-y-3 text-sm leading-7 text-mdlinx-secondary">
            <li>A deeper assessment built around AI, publishing, audience, and commercialization realities.</li>
            <li>Role-based input that surfaces where teams agree, diverge, or feel blocked.</li>
            <li>Structured and open-ended questions designed to produce useful strategic signal, not just raw opinions.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
