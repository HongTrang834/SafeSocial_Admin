// SafeSocial_Admin/app/layout.tsx

"use client"; // <--- BẮT BUỘC để dùng Hooks (useState, useEffect)

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

// Import các components cần thiết
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar'; // Import Sidebar
import { Toaster } from 'sonner'; // Import Toaster
import { ThemeProvider } from "@/components/theme-provider"; // Import ThemeProvider

// (Bạn có thể giữ metadata ở đây, nhưng nó sẽ không được dùng trong 
// file "use client". Bạn có thể di chuyển nó nếu muốn)
// export const metadata: Metadata = { ... }

// ========= AUTH WRAPPER =========
// Component này sẽ kiểm tra Token và quyết định render trang 
// hay chuyển hướng về /login
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    // 1. Nếu đang ở trang Login
    if (pathname === '/login') {
      if (token) {
        // Đã login, chuyển hướng về trang chủ
        router.replace('/');
      } else {
        // Chưa login, cho phép ở lại trang login
        setIsLoading(false);
      }
    }
    // 2. Nếu ở trang khác
    else {
      if (!token) {
        // Chưa login, chuyển về trang login
        router.replace('/login');
      } else {
        // Đã login, cho phép ở lại
        setIsLoading(false);
      }
    }
  }, [pathname, router]);

  // Nếu đang kiểm tra (isLoading)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Đang tải và xác thực...
      </div>
    );
  }

  // Nếu là trang Login (và chưa login), chỉ render trang Login
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Nếu đã xác thực, render Layout Admin (Sidebar + Nội dung)
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Thêm padding cho nội dung chính */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

// ========= ROOT LAYOUT =========
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* Bọc mọi thứ trong ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* AuthWrapper sẽ xử lý việc hiển thị Sidebar hoặc trang Login */}
          <AuthWrapper>
            {children}
          </AuthWrapper>

          {/* Để Toaster ở ngoài cùng */}
          <Toaster position="bottom-right" richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}