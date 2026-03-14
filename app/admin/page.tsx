import { AdoptionChart } from "@/components/charts/AdoptionChart";
import { BarrierBreakdown } from "@/components/charts/BarrierBreakdown";
import { MaturityGauge } from "@/components/charts/MaturityGauge";
import { PriorityAlignment } from "@/components/charts/PriorityAlignment";
import { ToolLandscape } from "@/components/charts/ToolLandscape";
import { UrgencySpectrum } from "@/components/charts/UrgencySpectrum";
import { WordCloud } from "@/components/charts/WordCloud";
import { Badge } from "@/components/ui/Badge";
import { isSupabaseConfigured, listResponses } from "@/lib/db";
import { buildConversationStarters, getAverageMaturity, getMostCommonBarrier, getTopUseCase } from "@/lib/scoring";

function countByLabel(values: string[]) {
  return Object.entries(values.reduce<Record<string, number>>((accumulator, value) => {
    accumulator[value] = (accumulator[value] ?? 0) + 1;
    return accumulator;
  }, {}))
    .map(([label, value]) => ({ label: label.replaceAll("_", " "), value }))
    .sort((a, b) => b.value - a.value);
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="border border-dotted border-mdlinx-secondary/30 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">{label}</p>
      <p className="mt-3 font-serif text-3xl text-mdlinx-navy">{value}</p>
    </article>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="space-y-4 border border-dotted border-mdlinx-secondary/30 bg-white p-6">
      <h2 className="font-serif text-2xl text-mdlinx-navy">{title}</h2>
      {children}
    </article>
  );
}

export default async function AdminPage() {
  const responses = await listResponses();
  const usingSupabase = isSupabaseConfigured();
  const conversationStarters = buildConversationStarters(responses);
  const usageData = countByLabel(responses.map((response) => response.answers.q1));
  const toolData = countByLabel(responses.flatMap((response) => response.answers.q2));
  const priorityData = countByLabel(responses.flatMap((response) => response.answers.q7));
  const wordCloudItems = countByLabel(
    responses.flatMap((response) => response.answers.q10.toLowerCase().split(/\W+/).filter((word) => word.length > 5)),
  )
    .slice(0, 12)
    .map((item) => item.label);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Badge>Admin dashboard</Badge>
        <h1 className="font-serif text-4xl text-mdlinx-navy">AI Readiness Snapshot</h1>
      </div>

      {!usingSupabase ? (
        <div className="border border-dotted border-mdlinx-secondary/30 bg-white p-4 text-sm leading-7 text-mdlinx-secondary">
          Supabase is not configured yet, so the dashboard is currently rendering mock responses.
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total responses" value={String(responses.length)} />
        <SummaryCard label="Average maturity" value={`${getAverageMaturity(responses)}/5`} />
        <SummaryCard label="Common barrier" value={getMostCommonBarrier(responses).replaceAll("_", " ")} />
        <SummaryCard label="Top use case" value={getTopUseCase(responses).replaceAll("_", " ")} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="AI usage frequency">
          <AdoptionChart data={usageData} />
        </ChartCard>
        <ChartCard title="Tool landscape">
          <ToolLandscape data={toolData} />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Average maturity">
          <MaturityGauge value={getAverageMaturity(responses)} />
        </ChartCard>
        <ChartCard title="Barrier breakdown">
          <BarrierBreakdown data={responses.map((response) => ({ role: response.role, barrier: response.answers.q6 }))} />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Priority alignment">
          <PriorityAlignment data={priorityData} />
        </ChartCard>
        <ChartCard title="Urgency spectrum">
          <UrgencySpectrum
            data={responses.map((response) => ({ name: response.name, role: response.role, urgency: response.answers.q8 }))}
          />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <ChartCard title="Conversation starters">
          <div className="space-y-3">
            {conversationStarters.map((starter) => (
              <div key={starter} className="border border-dotted border-mdlinx-secondary/20 p-4 text-sm leading-7 text-mdlinx-secondary">
                {starter}
              </div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Magic wand themes">
          <WordCloud items={wordCloudItems} />
        </ChartCard>
      </section>
    </div>
  );
}
