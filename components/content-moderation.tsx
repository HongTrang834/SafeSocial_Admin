"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, AlertTriangle, Eye } from "lucide-react"

const mockViolations = [
  {
    id: 1,
    postId: "POST-1234",
    author: "Nguyễn Văn A",
    content: "This is a sample post that was flagged for potential violation...",
    reason: "Hate Speech",
    reportedBy: 3,
    timestamp: "2025-02-10 14:30",
    status: "pending",
    severity: "high",
  },
  {
    id: 2,
    postId: "POST-1235",
    author: "Trần Thị B",
    content: "Another post with potentially inappropriate content...",
    reason: "Spam",
    reportedBy: 1,
    timestamp: "2025-02-10 13:15",
    status: "pending",
    severity: "low",
  },
  {
    id: 3,
    postId: "POST-1236",
    author: "Lê Văn C",
    content: "Post containing misleading information about...",
    reason: "Misinformation",
    reportedBy: 5,
    timestamp: "2025-02-10 12:45",
    status: "pending",
    severity: "medium",
  },
]

export function ContentModeration() {
  const [violations, setViolations] = useState(mockViolations)

  const handleApprove = (id: number) => {
    setViolations(violations.filter((v) => v.id !== id))
    console.log("[v0] Approved post:", id)
  }

  const handleReject = (id: number) => {
    setViolations(violations.filter((v) => v.id !== id))
    console.log("[v0] Rejected post:", id)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
      {violations.length === 0 ? (
        <Card className="p-12 bg-card border-border text-center">
          <Check className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
          <p className="text-muted-foreground">No pending content violations to review</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {violations.map((violation) => (
            <Card key={violation.id} className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground">{violation.postId}</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(violation.severity)}`}
                      >
                        {violation.severity.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
                        <AlertTriangle className="w-3 h-3" />
                        {violation.reason}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        By: <span className="text-foreground font-medium">{violation.author}</span>
                      </span>
                      <span>•</span>
                      <span>{violation.timestamp}</span>
                      <span>•</span>
                      <span>{violation.reportedBy} reports</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <p className="text-sm">{violation.content}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="default"
                    className="gap-2 bg-success hover:bg-success/90"
                    onClick={() => handleApprove(violation.id)}
                  >
                    <Check className="w-4 h-4" />
                    Approve Post
                  </Button>
                  <Button variant="destructive" className="gap-2" onClick={() => handleReject(violation.id)}>
                    <X className="w-4 h-4" />
                    Remove Post
                  </Button>
                  <Button variant="outline" className="gap-2 ml-auto bg-transparent">
                    <Eye className="w-4 h-4" />
                    View Full Post
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
