"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "01/01", posts: 1245 },
  { date: "01/02", posts: 1512 },
  { date: "01/03", posts: 1389 },
  { date: "01/04", posts: 1701 },
  { date: "01/05", posts: 1578 },
  { date: "01/06", posts: 1845 },
  { date: "01/07", posts: 2023 },
  { date: "01/08", posts: 1889 },
  { date: "01/09", posts: 2167 },
  { date: "01/10", posts: 2312 },
  { date: "01/11", posts: 2089 },
  { date: "01/12", posts: 2434 },
  { date: "01/13", posts: 2601 },
  { date: "01/14", posts: 2378 },
]

export function PostsCreatedChart() {
  return (
    <Card className="p-6 bg-white border-slate-200 shadow-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Daily Posts Published</h3>
          <p className="text-sm text-slate-600">Total posts created per day</p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: "12px" }} />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                cursor={{ fill: "#f97316", opacity: 0.1 }}
              />
              <Bar dataKey="posts" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
