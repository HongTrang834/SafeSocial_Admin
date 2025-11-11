// SafeSocial_Admin/components/sidebar.tsx

"use client" // <--- BẮT BUỘC KHI SỬ DỤNG HOOKS VÀ LOCALSTORAGE

import { usePathname, useRouter } from "next/navigation" // Cần import useRouter
import Link from "next/link"
import { Home, Users, ShieldAlert, BarChart, TrendingUp, LogOut } from "lucide-react" // Thêm LogOut
import { useState, useEffect } from "react";
// Giả định bạn có toast (sonner) để hiển thị thông báo
import { toast } from 'sonner';

// Định nghĩa navigation links
const navigation = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Quản lý người dùng", href: "/users", icon: Users },
  { name: "Kiểm duyệt nội dung", href: "/moderation", icon: ShieldAlert },
  { name: "Báo cáo của người dùng", href: "/reports", icon: BarChart },
  { name: "Thống kê", href: "/analytics", icon: TrendingUp },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // --- LOGIC LẤY THÔNG TIN USER ---
  const [adminName, setAdminName] = useState('Admin User'); // Tên hiển thị

  // Lấy tên Admin từ localStorage khi component được mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAdminName(user.name || 'Admin User');
      }
    } catch (e) {
      console.error("Lỗi parse admin_user:", e);
      setAdminName('Admin User');
    }
  }, []); // Chỉ chạy một lần

  // --- LOGIC XỬ LÝ ĐĂNG XUẤT ---
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');

    // Gửi thông báo
    toast.success("Đã đăng xuất.");

    // Chuyển hướng về trang đăng nhập
    router.push('/login');
  };

  // Kiểm tra nếu đang ở trang Login thì không render Sidebar
  if (pathname === '/login') {
    return null;
  }

  return (
    <aside className="w-64 bg-white flex flex-col border-r border-slate-200">

      {/* HEADER: LOGO/TITLE */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-slate-900">Social Admin</h2>
            <p className="text-xs text-slate-500">Content Moderation</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* FOOTER: ADMIN INFO & LOGOUT BUTTON */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 w-full">
          {/* Admin Avatar/Icon */}
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white">
            {/* Lấy 2 ký tự đầu của tên Admin */}
            {adminName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>

          {/* Tên Admin */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{adminName}</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>

          {/* Nút Đăng xuất */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

    </aside>
  );
}