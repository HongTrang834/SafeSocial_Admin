"use client"

import { useState, useEffect } from "react"
import axios from "axios"; // Cài đặt: npm install axios
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Unlock, Search, MoreVertical } from "lucide-react"

// !!! THAY ĐỔI URL NÀY thành địa chỉ server social media của bạn
const API_BASE_URL = 'http://localhost:5173';

// Định nghĩa kiểu dữ liệu cho user
interface User {
  _id: string;
  name: string;
  full_name: string;
  email: string;
  status: 'active' | 'locked';
  posts: any[]; // Bạn có thể định nghĩa kiểu chi tiết hơn nếu cần
  reports: number;
  joinDate: string;
  createdAt: string;
  profile_picture: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Giả sử bạn lưu token của admin trong localStorage sau khi đăng nhập
        // const token = localStorage.getItem('admin_token');
        const token = "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18zMVN2NDlFVHdqYndTZTg2czdFOEJJOTVPN2EiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJleHAiOjE3NjA4OTUyNzQsImZ2YSI6WzEwMCwtMV0sImlhdCI6MTc2MDg5NTIxNCwiaXNzIjoiaHR0cHM6Ly9pbi1za2luay0zLmNsZXJrLmFjY291bnRzLmRldiIsIm5iZiI6MTc2MDg5NTIwNCwic2lkIjoic2Vzc18zNEk3THJXMjQ2M2NSWUZRN2JpRnBxa0VrcW4iLCJzdHMiOiJhY3RpdmUiLCJzdWIiOiJ1c2VyXzMzcDRNWGd6MnNzMWhVR1oyTktYSEpsQjNXSiIsInYiOjJ9.hWcb1Is84rYCDMIkO1z6WE6Sp0N7eIxRv5WQRfYvyfKt2UYMTVrGhOgdazK9yT7HvoZfCenLyarg6xVN5WpXaBfbqEW21OpEWjEFUR8Qvsb_dsYSlrcvaFhPfpRpKPIIvCPPjSlWt2I2aFSr_c13BfBJW8hn3MhypsqH8bw22VMy8LI9AvRswhXE-GPU3MCnh3qyWl5jNRfugUDx-RTogs-Boea2bWTJ6ZSWxQzj-vOidaAWiM5zUqzTY_-yv0JHZDTmg5eeiJMNxI5_3ySB7xJuzc3ftC433tmsWvpm8hvUkXwVZ8kgb8g-U9ZSUwXawyTyr1J-4uC1w4w5brJtlA";

        if (!token) {
          throw new Error("Không tìm thấy token của admin. Vui lòng đăng nhập.");
        }

        const response = await axios.get< { success: boolean, users: User[] } >(`${API_BASE_URL}/user/admin/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          throw new Error("Lấy danh sách người dùng thất bại.");
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Lỗi khi tải dữ liệu người dùng:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, []); // Mảng rỗng để đảm bảo useEffect chỉ chạy một lần


  const toggleUserStatus = (userId: string) => {
    // Logic để gọi API khóa/mở khóa sẽ được thêm vào đây
    console.log("Khóa/Mở khóa người dùng:", userId);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return <div className="p-8 text-center">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
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
                <tr key={user._id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.profile_picture} alt={user.full_name} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                      <span className="font-medium">{user.full_name}</span>
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
                  <td className="px-6 py-4 text-sm">{user.posts?.length || 0}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${user.reports > 0 ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                      {user.reports || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
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