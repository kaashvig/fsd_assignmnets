import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { ProfileCard } from "@/components/profile-card"
import { ActivityList } from "@/components/activity-list"

type Activity = {
  id: string
  title: string
  timestamp: string
  description: string
}

export default function Page() {
  // Static dummy user data
  const user = {
    name: "Kaashvi Gupta",
    bio: "Cybersecurity Enthusiast | Creative Thinker | Tech Innovator",
    avatarUrl: "/professional-profile-headshot.jpg",
  }

  // Dummy recent activities
  const activities: Activity[] = [
    {
      id: "1",
      title: "Completed AI Medical Diagnosis Frontend Setup",
      timestamp: "2 hours ago",
      description:
        "Built responsive UI components and integrated routing for the AI triage flow.",
    },
    {
      id: "2",
      title: "Posted an Article on Cybersecurity Hygiene",
      timestamp: "1 day ago",
      description:
        "Shared a practical checklist on secure authentication and browsing best practices.",
    },
    {
      id: "3",
      title: "Reviewed PR: Improve Input Validation",
      timestamp: "3 days ago",
      description:
        "Suggested schema refinements and implemented server-side validation for critical endpoints.",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-white text-gray-900">
      {/* Top Navbar */}
      <Navbar title="My Dashboard" userName={user.name} avatarUrl={user.avatarUrl} />

      {/* Content Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Profile Section */}
          <div className="md:col-span-1">
            <Suspense fallback={<div className="text-gray-500">Loading profile...</div>}>
              <ProfileCard name={user.name} bio={user.bio} avatarUrl={user.avatarUrl} />
            </Suspense>
          </div>

          {/* Right Activity Section */}
          <div className="md:col-span-2">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-800">
              Recent Activities
            </h2>
            <Suspense fallback={<div className="text-gray-500">Loading activities...</div>}>
              <ActivityList activities={activities} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
