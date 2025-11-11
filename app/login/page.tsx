// SafeSocial_Admin/app/login/page.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

// URL của server API của bạn
const SERVER_URL = "http://localhost:5000"; // THAY THẾ BẰNG URL SERVER CỦA BẠN (nếu không chạy local)

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${SERVER_URL}/api/users/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success && data.isAdmin) {
                // 🔑 Đăng nhập thành công
                // LƯU TOKEN VÀO LOCAL STORAGE
                localStorage.setItem('admin_token', data.token);
                localStorage.setItem('admin_user', JSON.stringify({ name: data.full_name, email: data.email }));

                toast.success("Đăng nhập Admin thành công!");

                // Chuyển hướng đến trang Dashboard
                router.push('/');
            } else {
                // Đăng nhập thất bại (Server trả về 401/403)
                toast.error(data.message || "Tài khoản hoặc mật khẩu không đúng.");
            }
        } catch (error) {
            console.error('Lỗi kết nối hoặc xử lý:', error);
            toast.error("Lỗi kết nối. Vui lòng kiểm tra Server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Đăng nhập Admin</CardTitle>
                    <CardDescription className="text-center">
                        Sử dụng tài khoản Admin đã được cấu hình trong MongoDB.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}