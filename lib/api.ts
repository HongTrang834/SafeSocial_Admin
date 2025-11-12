// SafeSocial_Admin/lib/api.ts

import { toast } from 'sonner';

// URL Server của bạn
const SERVER_URL = "http://localhost:5000/api"; // Đảm bảo đây là URL chính xác

/**
 * Hàm helper để gọi API đã được xác thực bằng JWT Token.
 * Tự động đính kèm Token và xử lý các lỗi xác thực cơ bản.
 */
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('admin_token');

  // 1. Kiểm tra Token
  if (!token) {
    toast.error("Không tìm thấy Token. Vui lòng đăng nhập lại.");
    // Chuyển hướng về login
    window.location.href = '/login'; 
    throw new Error("Không có token xác thực.");
  }

  // 2. Thiết lập Headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Đính kèm Token
  };

  // Gộp header
  options.headers = { ...defaultHeaders, ...options.headers };

  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, options);

    // 3. Xử lý lỗi Token hết hạn/không hợp lệ
    if (response.status === 401 || response.status === 403) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
      throw new Error("Xác thực thất bại.");
    }
    
    // 4. Xử lý các lỗi khác
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Lỗi máy chủ: ${response.status}`);
    }

    // 5. Trả về dữ liệu JSON
    return await response.json();
    
  } catch (error) {
    console.error(`Lỗi khi gọi API ${endpoint}:`, error);
    throw error; // Ném lỗi để component có thể bắt
  }
};