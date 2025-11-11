// SafeSocial_Admin/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Lấy token từ Cookie (hoặc localStorage nếu bạn muốn)
  // Do chúng ta dùng localStorage trong login, nên kiểm tra trong Layout sẽ tốt hơn.
  // Tuy nhiên, dùng Middleware kiểm tra Cookie là chuẩn nhất cho Next.js Server-side.
  // **LƯU Ý:** Nếu muốn dùng middleware, bạn phải lưu token vào Cookie (ở bước 3.1) thay vì localStorage.
  
  // Dùng logic client-side check trong layout để đơn giản hóa.
  // Tuy nhiên, chúng ta vẫn cần middleware để chuyển hướng.
  
  // VÌ BẠN ĐANG DÙNG LOCALSTORAGE, CHÚNG TA KHÔNG THỂ LẤY TOKEN Ở ĐÂY.
  // CHÚNG TA SẼ DÙNG LOGIC CHUYỂN HƯỚNG CƠ BẢN SAU.
  
  const pathname = request.nextUrl.pathname;
  const protectedRoutes = ['/', '/users', '/reports', '/analytics', '/moderation']; 

  // --- LOGIC CHUYỂN HƯỚNG CƠ BẢN ---
  
  // Giả định: Các trang Protected Routes cần phải có Token.
  // Chúng ta sẽ buộc tất cả các Protected Routes phải tải layout/component để kiểm tra localStorage.
  
  if (pathname === '/login') {
      // Logic: Nếu đã ở trang /login thì không cần làm gì.
      return NextResponse.next();
  }

  // Nếu truy cập bất kỳ trang Admin nào khác, chúng ta sẽ để component xử lý.
  // Nếu bạn muốn bảo vệ nghiêm ngặt hơn, bạn cần quay lại Bước 3.1 và lưu token vào Cookie (dùng Server component hoặc API route).

  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các route
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};