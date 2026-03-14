import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <section className="space-y-8">
        <Badge>Assessment</Badge>
        <div className="space-y-5">
          <h1 className="max-w-3xl font-serif text-5xl leading-tight text-mdlinx-navy md:text-6xl">
            A sharper read on how MDLinx should navigate AI, publishing change, and audience pressure.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-mdlinx-secondary">
            This assessment is designed to take about 8 to 10 minutes. It covers AI adoption, editorial and audience
            pressure, operating readiness, and the strategic moves that matter most for a healthcare media business.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/quiz">
            <Button>Start assessment</Button>
          </Link>
        </div>
      </section>

      <aside className="space-y-6 border border-dotted border-mdlinx-secondary/30 bg-white p-8 shadow-panel">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">What this captures</p>
        <div className="space-y-4">
          <h2 className="font-serif text-3xl text-mdlinx-navy">A clearer MDLinx strategy signal</h2>
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
