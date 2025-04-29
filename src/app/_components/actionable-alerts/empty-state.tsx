import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "~/app/_components/ui/card"

export function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">No alerts!</h3>
        <p className="text-gray-500 max-w-sm">
          Your team is in great shape. We&apos;ll notify you when something needs your attention.
        </p>
      </CardContent>
    </Card>
  )
}
