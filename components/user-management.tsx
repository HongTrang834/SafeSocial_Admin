"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Unlock, Search, MoreVertical } from "lucide-react"

const mockUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    status: "active",
    posts: 145,
    reports: 0,
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    status: "active",
    posts: 89,
    reports: 2,
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    status: "locked",
    posts: 234,
    reports: 8,
    joinDate: "2023-11-10",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    status: "active",
    posts: 67,
    reports: 1,
    joinDate: "2024-03-05",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@email.com",
    status: "active",
    posts: 312,
    reports: 0,
    joinDate: "2023-09-22",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "locked" : "active" } : user,
      ),
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-secondary/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Posts</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Reports</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Join Date</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "active" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Locked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{user.posts}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm ${user.reports > 0 ? "text-destructive font-medium" : "text-muted-foreground"}`}
                    >
                      {user.reports}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant={user.status === "active" ? "destructive" : "default"}
                        onClick={() => toggleUserStatus(user.id)}
                        className="gap-2"
                      >
                        {user.status === "active" ? (
                          <>
                            <Lock className="w-4 h-4" />
                            Lock
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4" />
                            Unlock
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
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
