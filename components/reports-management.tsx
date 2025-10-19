"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flag, Check, X, Eye, MessageSquare } from "lucide-react"

const mockReports = [
  {
    id: 1,
    reportedUser: "Lê Văn C",
    reportedBy: "Nguyễn Văn A",
    reason: "Harassment",
    description: "User is sending threatening messages and harassing other members",
    postId: "POST-1234",
    timestamp: "2025-02-10 15:20",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    reportedUser: "Phạm Thị D",
    reportedBy: "Trần Thị B",
    reason: "Spam",
    description: "Posting promotional content repeatedly",
    postId: "POST-1235",
    timestamp: "2025-02-10 14:10",
    status: "pending",
    priority: "low",
  },
  {
    id: 3,
    reportedUser: "Hoàng Văn E",
    reportedBy: "Multiple Users",
    reason: "Inappropriate Content",
    description: "Sharing explicit content that violates community guidelines",
    postId: "POST-1236",
    timestamp: "2025-02-10 13:30",
    status: "pending",
    priority: "high",
  },
]

export function ReportsManagement() {
  const [reports, setReports] = useState(mockReports)

  const handleResolve = (id: number, action: "approve" | "reject") => {
    setReports(reports.filter((r) => r.id !== id))
    console.log("[v0] Report resolved:", id, action)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive bg-destructive/20"
      case "medium":
        return "text-accent bg-accent/20"
      case "low":
        return "text-muted-foreground bg-muted"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <div className="p-8 space-y-6">
      {reports.length === 0 ? (
        <Card className="p-12 bg-card border-border text-center">
          <Check className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Pending Reports</h3>
          <p className="text-muted-foreground">All user reports have been reviewed</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <Flag className="w-5 h-5 text-destructive" />
                      <span className="font-semibold text-lg">{report.reason}</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}
                      >
                        {report.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        Reported User: <span className="text-foreground font-medium">{report.reportedUser}</span>
                      </span>
                      <span>•</span>
                      <span>
                        By: <span className="text-foreground font-medium">{report.reportedBy}</span>
                      </span>
                      <span>•</span>
                      <span>{report.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Description:</p>
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <p className="text-sm">{report.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    Related Post: <span className="text-foreground font-mono">{report.postId}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    variant="default"
                    className="gap-2 bg-success hover:bg-success/90"
                    onClick={() => handleResolve(report.id, "approve")}
                  >
                    <Check className="w-4 h-4" />
                    Dismiss Report
                  </Button>
                  <Button variant="destructive" className="gap-2" onClick={() => handleResolve(report.id, "reject")}>
                    <X className="w-4 h-4" />
                    Take Action
                  </Button>
                  <Button variant="outline" className="gap-2 ml-auto bg-transparent">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
