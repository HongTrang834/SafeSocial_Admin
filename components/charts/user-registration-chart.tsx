"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "01/01", users: 245 },
  { date: "01/02", users: 312 },
  { date: "01/03", users: 289 },
  { date: "01/04", users: 401 },
  { date: "01/05", users: 378 },
  { date: "01/06", users: 445 },
  { date: "01/07", users: 523 },
  { date: "01/08", users: 489 },
  { date: "01/09", users: 567 },
  { date: "01/10", users: 612 },
  { date: "01/11", users: 589 },
  { date: "01/12", users: 634 },
  { date: "01/13", users: 701 },
  { date: "01/14", users: 678 },
]

export function UserRegistrationChart() {
  return (
    <Card className="p-6 bg-white border-slate-200 shadow-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">User Registrations Overview</h3>
          <p className="text-sm text-slate-600">New users signing up over time</p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
