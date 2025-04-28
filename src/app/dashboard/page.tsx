import { api } from "~/trpc/server";

export default async function Page() {
    const issues = await api.linear.getIssues()

    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <h1 className="text-2xl font-bold">Your Linear Issues</h1>
        <div className="grid gap-4">
          {issues.map((issue) => (
            <div key={issue.id} className="p-4 border rounded-lg">
              <h2 className="text-lg font-semibold">{issue.title}</h2>
              <p className="text-sm text-gray-600">Status: {issue.state}</p>
              <p className="text-sm text-gray-600">Priority: {issue.priority ?? "No priority"}</p>
            </div>
          ))}
        </div>
      </div>
    );
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <h1 className="text-2xl font-bold">Linear Integration</h1>
        <p>Please connect your Linear account to view your issues.</p>
      </div>
    );
}
