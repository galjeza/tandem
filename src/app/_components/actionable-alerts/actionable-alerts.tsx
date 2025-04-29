"use client"

import { useState } from "react"
import { RefreshCcw } from "lucide-react"
import { Button } from "~/app/_components/ui/button"
import { AlertCard } from "./alert-card"
import { EmptyState } from "./empty-state"

// Sample alert data
const initialAlerts = [
  {
    id: "alert-1",
    severity: "critical" as const   ,
    title: "API Response Time Degradation",
    description: "The average response time for the /users endpoint has increased by 300% in the last hour.",
    timestamp: "Detected 2 hours ago",
    relatedIssues: [
      { id: "DEV-123", title: "Investigate database query performance" },
      { id: "DEV-124", title: "Scale up API servers" },
    ],
  },
  {
    id: "alert-2",
    severity: "warning" as const,
    title: "Increased Error Rate in Authentication Service",
    description: "Error rate has risen to 5% for login attempts, potentially affecting user experience.",
    timestamp: "Detected 30 minutes ago",
    relatedIssues: [
      { id: "DEV-125", title: "Debug auth service errors" },
      { id: "DEV-126", title: "Review recent auth service changes" },
    ],
  },
  {
    id: "alert-3",
    severity: "info" as const,
    title: "New Feature Deployment Complete",
    description: "The team calendar integration has been successfully deployed to production.",
    timestamp: "Detected 4 hours ago",
    relatedIssues: [
      { id: "DEV-127", title: "Monitor calendar sync performance" },
      { id: "DEV-128", title: "Collect user feedback on calendar feature" },
    ],
  },
]

export default function ActionableAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [isLoading, setIsLoading] = useState(false)

  const refreshAlerts = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Toggle between showing alerts and empty state for demo purposes
      setAlerts(alerts.length > 0 ? [] : initialAlerts)
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Actionable Alerts</h1>
        <Button onClick={refreshAlerts} variant="outline" size="sm" disabled={isLoading}>
          <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {alerts.length > 0 ? alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />) : <EmptyState />}
      </div>
    </div>
  )
}
