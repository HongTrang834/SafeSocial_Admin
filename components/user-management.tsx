// SafeSocial_Admin/components/user-management.tsx

"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, UserX, UserCheck, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import { fetchWithAuth } from "@/lib/api";

// Định nghĩa kiểu dữ liệu (Interface) cho User
// Dựa trên User Model của server
interface User {
  _id: string;
  full_name: string;
  email: string;
  username: string;
  isAdmin: boolean;
  status: 'active' | 'locked'; // Dựa trên logic status của server
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);

  // Lấy ID của admin đang đăng nhập (để tránh tự khóa mình)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Giả sử API login trả về _id (Nếu không, bạn cần sửa lại hàm loginAdmin)
        // Nếu hàm login chỉ trả về 'id', dùng 'user.id'
        // setCurrentAdminId(user._id); 
      }
    } catch (e) { console.error(e); }
  }, []);

  // --- HÀM LẤY DỮ LIỆU ---
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Dùng hàm helper (đã tự đính kèm Token)
      // API endpoint: GET /api/users/all
      const data = await fetchWithAuth("/user/all", {
        method: 'GET',
      });

      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message || "Không thể tải danh sách người dùng.");
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi tải dữ liệu người dùng.");
    } finally {
      setIsLoading(false);
    }
  };

  // Tự động gọi fetchUsers khi component được mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // --- CÁC HÀM HÀNH ĐỘNG ---

  // Hàm Khóa (Lock) User
  const handleLockUser = async (userId: string) => {
    try {
      // API endpoint: PATCH /api/users/:userId/lock
      const data = await fetchWithAuth(`/user/${userId}/lock`, {
        method: 'PATCH',
      });

      if (data.success) {
        toast.success(data.message || `Đã khóa tài khoản.`);
        fetchUsers(); // Tải lại danh sách
      } else {
        toast.error(data.message || "Khóa thất bại.");
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi khóa người dùng.");
    }
  };

  // Hàm Mở khóa (Unlock) User
  const handleUnlockUser = async (userId: string) => {
    try {
      // API endpoint: PATCH /api/users/:userId/unlock
      const data = await fetchWithAuth(`/user/${userId}/unlock`, {
        method: 'PATCH',
      });

      if (data.success) {
        toast.success(data.message || `Đã mở khóa tài khoản.`);
        fetchUsers(); // Tải lại danh sách
      } else {
        toast.error(data.message || "Mở khóa thất bại.");
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi mở khóa người dùng.");
    }
  };

  // --- RENDER ---

  if (isLoading) {
    return <div className="text-center p-10">Đang tải danh sách người dùng...</div>;
  }

  return (
    <div className="space-y-4 p-8">
      <p className="text-muted-foreground">
        Tổng số {users.length} tài khoản trong hệ thống.
      </p>

      {/* Bảng dữ liệu */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  Không tìm thấy người dùng nào.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username || "N/A"}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <Badge variant="destructive">Admin</Badge>
                    ) : (
                      <Badge variant="outline">User</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.status === 'active' ? (
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700">Hoạt động</Badge>
                    ) : (
                      <Badge variant="secondary">Đã khóa</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Không cho phép thao tác với Admin */}
                    {user.isAdmin ? (
                      <span className="flex items-center justify-end text-xs text-muted-foreground">
                        <ShieldOff className="w-4 h-4 mr-1" /> Không thể thao tác
                      </span>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.status === 'active' ? (
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => handleLockUser(user._id)}
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Khóa tài khoản
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => handleUnlockUser(user._id)}
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Mở khóa tài khoản
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}