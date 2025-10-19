"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "01/01", rate: 2.4 },
  { date: "01/02", rate: 3.1 },
  { date: "01/03", rate: 2.8 },
  { date: "01/04", rate: 4.2 },
  { date: "01/05", rate: 3.7 },
  { date: "01/06", rate: 3.3 },
  { date: "01/07", rate: 2.9 },
  { date: "01/08", rate: 3.5 },
  { date: "01/09", rate: 4.1 },
  { date: "01/10", rate: 3.8 },
  { date: "01/11", rate: 3.2 },
  { date: "01/12", rate: 2.7 },
  { date: "01/13", rate: 3.4 },
  { date: "01/14", rate: 2.9 },
]

export function ViolationRateChart() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Content Violation Rate</h3>
          <p className="text-sm text-muted-foreground">Percentage of flagged content</p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis dataKey="date" stroke="hsl(0 0% 60%)" style={{ fontSize: "12px" }} />
              <YAxis stroke="hsl(0 0% 60%)" style={{ fontSize: "12px" }} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 7%)",
                  border: "1px solid hsl(0 0% 20%)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value}%`, "Violation Rate"]}
              />
              <Line type="monotone" dataKey="rate" stroke="hsl(0 84% 60%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
