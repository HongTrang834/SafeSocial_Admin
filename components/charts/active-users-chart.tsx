"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "01/01", users: 5245 },
  { date: "01/02", users: 6312 },
  { date: "01/03", users: 5889 },
  { date: "01/04", users: 7201 },
  { date: "01/05", users: 6978 },
  { date: "01/06", users: 7545 },
  { date: "01/07", users: 8123 },
  { date: "01/08", users: 7689 },
  { date: "01/09", users: 8467 },
  { date: "01/10", users: 8912 },
  { date: "01/11", users: 8389 },
  { date: "01/12", users: 9134 },
  { date: "01/13", users: 9501 },
  { date: "01/14", users: 8942 },
]

export function ActiveUsersChart() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Daily Active Users</h3>
          <p className="text-sm text-muted-foreground">Users active in the last 24 hours</p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis dataKey="date" stroke="hsl(0 0% 60%)" style={{ fontSize: "12px" }} />
              <YAxis stroke="hsl(0 0% 60%)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 7%)",
                  border: "1px solid hsl(0 0% 20%)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="hsl(142 71% 45%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorActive)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
