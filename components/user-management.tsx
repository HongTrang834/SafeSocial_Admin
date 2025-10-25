"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Unlock, Search } from "lucide-react"

interface User {
  _id: string;
  name: string;
  email: string;
  status: "active" | "locked";
  posts: number;
  reports: number;
  joinDate: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/user/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Không thể tải danh sách người dùng');
        }

        const data = await response.json();

        if (data.success) {
          const fetchedUsers = data.users.map((apiUser: any) => ({
            _id: apiUser._id,
            name: apiUser.full_name || apiUser.name,
            email: apiUser.email,
            status: apiUser.status || "active",
            posts: apiUser.postsCount || 0,
            reports: apiUser.reportsCount || 0,
            joinDate: new Date(apiUser.createdAt).toLocaleDateString('vi-VN'),
          }));
          setUsers(fetchedUsers);
        } else {
          throw new Error(data.message || 'Lỗi không xác định từ API');
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Lỗi fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật trạng thái');
      }

      // Cập nhật UI sau khi thành công
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId
            ? { ...user, status: user.status === "active" ? "locked" : "active" }
            : user
        )
      );
    } catch (err: any) {
      console.error("Lỗi toggle status:", err);
      alert(err.message);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải danh sách người dùng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="text-red-600 text-lg">⚠️ Lỗi: {error}</div>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground mt-1">
            Tổng số: {users.length} người dùng
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <Card className="bg-card border-border p-12">
          <div className="text-center text-muted-foreground">
            <p className="text-lg">Không tìm thấy người dùng nào</p>
          </div>
        </Card>
      ) : (
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Người dùng</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Bài viết</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Báo cáo</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Ngày tham gia</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                      >
                        {user.status === "active" ? "Hoạt động" : "Bị khóa"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.posts}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm ${user.reports > 0
                            ? "text-destructive font-medium"
                            : "text-muted-foreground"
                          }`}
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
                          onClick={() => toggleUserStatus(user._id)}
                          className="gap-2"
                        >
                          {user.status === "active" ? (
                            <>
                              <Lock className="w-4 h-4" />
                              Khóa
                            </>
                          ) : (
                            <>
                              <Unlock className="w-4 h-4" />
                              Mở khóa
                            </>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}