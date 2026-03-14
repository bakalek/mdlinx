import { AdoptionChart } from "@/components/charts/AdoptionChart";
import { BarrierBreakdown } from "@/components/charts/BarrierBreakdown";
import { MaturityGauge } from "@/components/charts/MaturityGauge";
import { PriorityAlignment } from "@/components/charts/PriorityAlignment";
import { ToolLandscape } from "@/components/charts/ToolLandscape";
import { UrgencySpectrum } from "@/components/charts/UrgencySpectrum";
import { WordCloud } from "@/components/charts/WordCloud";
import { Badge } from "@/components/ui/Badge";
import { generateAiDashboardAnalysis, isOpenAIConfigured } from "@/lib/ai-analysis";
import { isSupabaseConfigured, listResponses } from "@/lib/db";
import { buildDashboardSnapshot } from "@/lib/scoring";

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
  const aiEnabled = isOpenAIConfigured();
  const snapshot = buildDashboardSnapshot(responses);
  const aiAnalysis = await generateAiDashboardAnalysis(responses);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Badge>Admin dashboard</Badge>
        <h1 className="font-serif text-4xl text-mdlinx-navy">MDLinx strategy snapshot</h1>
      </div>

      {!usingSupabase ? (
        <div className="border border-dotted border-mdlinx-secondary/30 bg-white p-4 text-sm leading-7 text-mdlinx-secondary">
          Supabase is not configured yet, so the dashboard is currently rendering mock responses.
        </div>
      ) : null}

      {!aiEnabled ? (
        <div className="border border-dotted border-mdlinx-secondary/30 bg-white p-4 text-sm leading-7 text-mdlinx-secondary">
          Add `OPENAI_API_KEY` in Vercel to enable AI-assisted strategy analysis on this dashboard.
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total responses" value={String(snapshot.totalResponses)} />
        <SummaryCard label="Readiness index" value={`${snapshot.readinessIndex}/5`} />
        <SummaryCard label="Top blocker" value={snapshot.topConstraint} />
        <SummaryCard label="Top priority" value={snapshot.topPriority} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="AI usage frequency">
          <AdoptionChart data={snapshot.usageData} />
        </ChartCard>
        <ChartCard title="Tool landscape">
          <ToolLandscape data={snapshot.toolData} />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Composite readiness">
          <MaturityGauge value={snapshot.readinessIndex} />
        </ChartCard>
        <ChartCard title="Capability gap by role">
          <BarrierBreakdown data={snapshot.capabilityGapByRole} />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Workflow pressure">
          <PriorityAlignment data={snapshot.workflowPressureData} />
        </ChartCard>
        <ChartCard title="Competitive urgency">
          <UrgencySpectrum
            data={snapshot.responseUrgencyData}
          />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <ChartCard title="Ranked strategic priorities">
          <PriorityAlignment data={snapshot.priorityData} />
        </ChartCard>
        <ChartCard title="Durable advantage signals">
          <ToolLandscape data={snapshot.durableEdgeData} />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <ChartCard title="Opportunity areas">
          <PriorityAlignment data={snapshot.opportunityData} />
        </ChartCard>
        <ChartCard title="Pilot-ready teams">
          <ToolLandscape data={snapshot.pilotReadinessData} />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <ChartCard title="Strategic signals from the survey">
          <div className="space-y-3">
            {snapshot.strategicSignals.map((starter) => (
              <div key={starter} className="border border-dotted border-mdlinx-secondary/20 p-4 text-sm leading-7 text-mdlinx-secondary">
                {starter}
              </div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="AI analysis">
          {aiAnalysis ? (
            <div className="space-y-5 text-sm leading-7 text-mdlinx-secondary">
              <div className="border border-dotted border-mdlinx-secondary/20 p-4">{aiAnalysis.summary}</div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">Opportunities</p>
                {aiAnalysis.opportunities.map((item) => (
                  <div key={item} className="border border-dotted border-mdlinx-secondary/20 p-4">
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">Risks</p>
                {aiAnalysis.risks.map((item) => (
                  <div key={item} className="border border-dotted border-mdlinx-secondary/20 p-4">
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">Recommendations</p>
                {aiAnalysis.recommendations.map((item) => (
                  <div key={item} className="border border-dotted border-mdlinx-secondary/20 p-4">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-dotted border-mdlinx-secondary/20 p-4 text-sm leading-7 text-mdlinx-secondary">
              AI analysis will appear here once `OPENAI_API_KEY` is configured and responses are available.
            </div>
          )}
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Opportunity themes">
          <WordCloud items={snapshot.openOpportunityThemes} />
        </ChartCard>
        <ChartCard title="Risk themes">
          <WordCloud items={snapshot.openRiskThemes} />
        </ChartCard>
      </section>
    </div>
  );
}
