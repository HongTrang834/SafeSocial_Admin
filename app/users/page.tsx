import { Sidebar } from "@/components/sidebar"
import { UserManagement } from "@/components/user-management"

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
          </div>
        </div>
        <UserManagement />
      </main>
    </div>
  )
}
