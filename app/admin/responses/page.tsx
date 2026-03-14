import { getOptionLabel } from "@/lib/questions";
import { listResponses } from "@/lib/db";

export default async function ResponsesPage() {
  const responses = await listResponses();

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-4xl text-mdlinx-navy">Individual Responses</h1>
      <div className="overflow-hidden border border-dotted border-mdlinx-secondary/30 bg-white">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-mdlinx-light">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Readiness</th>
              <th className="px-4 py-3">Top priority</th>
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3">Opportunity</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => (
              <tr key={response.id} className="border-t border-dotted border-mdlinx-secondary/20 align-top">
                <td className="px-4 py-4 font-medium text-mdlinx-body">{response.name}</td>
                <td className="px-4 py-4 text-mdlinx-secondary">{response.role}</td>
                <td className="px-4 py-4 text-mdlinx-secondary">{response.answers.q4}/5</td>
                <td className="px-4 py-4 text-mdlinx-secondary">
                  {response.answers.q10.map((value) => getOptionLabel("q10", value)).join(", ")}
                </td>
                <td className="px-4 py-4 text-mdlinx-secondary">{getOptionLabel("q15", response.answers.q15)}</td>
                <td className="px-4 py-4 text-mdlinx-secondary">{response.answers.q16}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
