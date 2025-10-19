import { UserRegistrationChart } from "@/components/charts/user-registration-chart"
import { PostsCreatedChart } from "@/components/charts/posts-created-chart"
import { ViolationRateChart } from "@/components/charts/violation-rate-chart"
import { ActiveUsersChart } from "@/components/charts/active-users-chart"

export function AnalyticsDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserRegistrationChart />
        <PostsCreatedChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ViolationRateChart />
        <ActiveUsersChart />
      </div>
    </div>
  )
}
