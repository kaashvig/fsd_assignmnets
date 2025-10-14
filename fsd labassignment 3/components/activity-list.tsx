"use client"

import { ActivityCard } from "@/components/activity-card"

type Activity = {
  id: string
  title: string
  timestamp: string
  description: string
}

export function ActivityList({ activities }: { activities: Activity[] }) {
  return (
    <div className="grid gap-4">
      {activities.map((item, idx) => (
        <ActivityCard
          key={item.id ?? idx}
          title={item.title}
          timestamp={item.timestamp}
          description={item.description}
        />
      ))}
    </div>
  )
}
