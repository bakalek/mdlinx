import { getOptionLabel } from "@/lib/questions";
import { listResponses } from "@/lib/db";
import { deleteAllResponsesAction, deleteSingleResponseAction } from "@/app/admin/responses/actions";

export default async function ResponsesPage() {
  const responses = await listResponses();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-none border border-dotted border-mdlinx-secondary/30 bg-white p-5 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-mdlinx-navy md:text-4xl">Individual Responses</h1>
          <p className="max-w-2xl text-sm leading-7 text-mdlinx-secondary">
            Use these controls to remove test data before real responses begin flowing in.
          </p>
        </div>
        <form action={deleteAllResponsesAction}>
          <button
            type="submit"
            className="border border-mdlinx-red px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-red transition hover:bg-mdlinx-red hover:text-white"
          >
            Clear all responses
          </button>
        </form>
      </div>

      <div className="overflow-x-auto border border-dotted border-mdlinx-secondary/30 bg-white">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-mdlinx-light">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Readiness</th>
              <th className="px-4 py-3">Top priority</th>
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3">Opportunity</th>
              <th className="px-4 py-3 text-right">Remove</th>
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
                <td className="px-4 py-4 text-right">
                  <form action={deleteSingleResponseAction}>
                    <input type="hidden" name="id" value={response.id} />
                    <button
                      type="submit"
                      className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-red transition hover:text-mdlinx-navy"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
