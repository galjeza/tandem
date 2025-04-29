import { api } from "~/trpc/server";
import ActionableAlerts from "../_components/actionable-alerts/actionable-alerts";
export default async function Page() {
    const alerts = await api.linear.getActionableAlerts()

    console.log(alerts)

    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6" >
        <ActionableAlerts />
      </div>
    );
}
