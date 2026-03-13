import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <section className="space-y-8">
        <Badge>AI readiness quiz</Badge>
        <div className="space-y-5">
          <h1 className="max-w-3xl font-serif text-5xl leading-tight text-mdlinx-navy md:text-6xl">
            Before dinner, a quick read on how MDLinx is thinking about AI.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-mdlinx-secondary">
            This survey is designed to take about three minutes. The goal is to surface where the team sees opportunity,
            friction, and urgency so the conversation starts with signal instead of abstractions.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/quiz">
            <Button>Get started</Button>
          </Link>
          <Link href="/admin">
            <Button variant="secondary">Preview dashboard</Button>
          </Link>
        </div>
      </section>

      <aside className="space-y-6 border border-dotted border-mdlinx-secondary/30 bg-white p-8 shadow-panel">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">What this unlocks</p>
        <div className="space-y-4">
          <h2 className="font-serif text-3xl text-mdlinx-navy">A sharper dinner conversation</h2>
          <ul className="space-y-3 text-sm leading-7 text-mdlinx-secondary">
            <li>10-question pulse survey with stepped respondent flow.</li>
            <li>Private admin dashboard with team patterns and response detail.</li>
            <li>Auto-generated conversation starters based on response gaps.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
