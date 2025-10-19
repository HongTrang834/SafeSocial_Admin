"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, ShieldAlert, BarChart, TrendingUp } from "lucide-react"

const navigation = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Quản lý người dùng", href: "/users", icon: Users },
  { name: "Kiểm duyệt nội dung", href: "/moderation", icon: ShieldAlert },
  { name: "Báo cáo của người dùng", href: "/reports", icon: BarChart },
  { name: "Thống kê", href: "/analytics", icon: TrendingUp },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white flex flex-col border-r border-slate-200">
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

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-blue-100 text-blue-800 font-semibold" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white">
            AU
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@social.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
