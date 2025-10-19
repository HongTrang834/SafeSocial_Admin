"use client"

import { Card } from "@/components/ui/card"
import { Users, Activity, FilePlus, ShieldAlert, TrendingUp, TrendingDown } from "lucide-react"
import { UserRegistrationChart } from "@/components/charts/user-registration-chart"
import { PostsCreatedChart } from "@/components/charts/posts-created-chart"

const stats = [
  {
    title: "Total Users",
    value: "12,450",
    change: "+5.8% from last month",
    trend: "up",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active Users (24h)",
    value: "1,120",
    change: "-2.1% from yesterday",
    trend: "down",
    icon: Activity,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Posts Created",
    value: "2,780",
    change: "+15% from last month",
    trend: "up",
    icon: FilePlus,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Pending Moderation",
    value: "85",
    change: "+10 from yesterday",
    trend: "up",
    icon: ShieldAlert,
    color: "bg-amber-100 text-amber-600",
  },
]

const recentFlaggedContent = [
  {
    id: 1,
    user: { name: "John Doe", avatar: "JD" },
    content: "This is inappropriate content that violates...",
    reason: "Hate Speech",
    date: "2025-02-10",
  },
  {
    id: 2,
    user: { name: "Jane Smith", avatar: "JS" },
    content: "Spam content promoting fake products...",
    reason: "Spam",
    date: "2025-02-10",
  },
  {
    id: 3,
    user: { name: "Mike Johnson", avatar: "MJ" },
    content: "Graphic violence content showing...",
    reason: "Violence",
    date: "2025-02-09",
  },
  {
    id: 4,
    user: { name: "Sarah Williams", avatar: "SW" },
    content: "Misleading information about health...",
    reason: "Misinformation",
    date: "2025-02-09",
  },
]

export function DashboardOverview() {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card
              key={stat.title}
              className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 font-medium">{stat.title}</p>
                  <p
                    className={`text-3xl font-bold ${stat.title === "Pending Moderation" ? "text-amber-600" : "text-slate-900"}`}
                  >
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserRegistrationChart />
        <PostsCreatedChart />
      </div>

      <Card className="p-6 bg-white border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Flagged Content</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">User</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Content Snippet</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Reason for Flag</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentFlaggedContent.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold text-white">
                        {item.user.avatar}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{item.user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-slate-600 truncate max-w-md">{item.content}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {item.reason}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-500">{item.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
