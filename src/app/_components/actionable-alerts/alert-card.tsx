"use client"

import { Badge } from "~/app/_components/ui/badge"
import { Card, CardContent } from "~/app/_components/ui/card"
import Image from "next/image"

type RelatedIssue = {
  id: string
  title: string
}

type Alert = {
  id: string
  severity: "critical" | "warning" | "info"
  title: string
  description: string
  timestamp: string
  relatedIssues: RelatedIssue[]
}

interface AlertCardProps {
  alert: Alert
}

export function AlertCard({ alert }: AlertCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "info":
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getSeverityLabel = (severity: string) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Badge className={`${getSeverityColor(alert.severity)} font-medium`}>
            {getSeverityLabel(alert.severity)}
          </Badge>
          <span className="text-sm text-gray-500">{alert.timestamp}</span>
        </div>

        <h3 className="text-lg font-bold mb-2">{alert.title}</h3>
        <p className="text-gray-600 mb-4">{alert.description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Related Issues</h4>
          <div className="flex flex-wrap gap-2">
            {alert.relatedIssues.map((issue) => (
              <Badge
                key={issue.id}
              >
                <div className="flex items-statt gap-1">
                  <Image
                    src="/Linear_Symbol_0.svg"
                    alt="Linear"
                    width={12}
                    height={12}
                    className="brightness-0 invert"
                  />
<p>{issue.id} - {issue.title}</p>                
                </div>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
