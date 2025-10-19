import { Sidebar } from "@/components/sidebar"
import { ContentModeration } from "@/components/content-moderation"

export default function ModerationPage() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold">Kiểm duyệt nội dung</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Pending:</span>
              <span className="px-2.5 py-1 rounded-full bg-destructive/20 text-destructive text-sm font-medium">
                23
              </span>
            </div>
          </div>
        </div>
        <ContentModeration />
      </main>
    </div>
  )
}
