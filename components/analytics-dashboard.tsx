// components/analytics-dashboard.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, FileText, FileWarning, BarChart } from "lucide-react";
import { UserRegistrationChart } from "@/components/charts/user-registration-chart";
// (Import các biểu đồ khác khi bạn sẵn sàng)
// import PostsCreatedChart from "@/components/charts/posts-created-chart";
// import ActiveUsersChart from "@/components/charts/active-users-chart";
// import ViolationRateChart from "@/components/charts/violation-rate-chart";
import { fetchWithAuth } from "@/lib/api"; // Import hàm helper
import { toast } from "sonner";

// Kiểu dữ liệu cho Stats Cards
interface StatsCardsData {
  totalUsers: number;
  totalPosts: number;
  totalReports: number;
  pendingReports: number;
}

// Kiểu dữ liệu cho Chart (Mẫu)
interface ChartData {
  name: string; // Tên (ví dụ: ngày)
  [key: string]: any; // Giá trị (ví dụ: users: 10)
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<StatsCardsData | null>(null);
  const [userChartData, setUserChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Gọi đồng thời cả hai API
        const [statsData, chartData] = await Promise.all([
          fetchWithAuth("/analytics/stats-cards"),
          fetchWithAuth("/analytics/user-chart")
        ]);

        if (statsData.success) {
          setStats(statsData.stats);
        }
        if (chartData.success) {
          setUserChartData(chartData.data);
        }

      } catch (error: any) {
        toast.error("Lỗi khi tải dữ liệu thống kê: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-10">Đang tải dữ liệu thống kê...</div>;
  }

  return (
    <div className="space-y-6">

      {/* 1. Các Thẻ Chỉ số */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Bài viết</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPosts ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Báo cáo</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalReports ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Báo cáo chờ xử lý</CardTitle>
            <FileWarning className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats?.pendingReports ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Các Biểu đồ */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Người dùng đăng ký (30 ngày qua)</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Truyền data vào biểu đồ */}
            {/* <UserRegistrationChart data={userChartData} /> */}
          </CardContent>
        </Card>

        {/* (Các biểu đồ khác sẽ được thêm ở đây) */}
        {/*
        <Card>
          <CardHeader>
            <CardTitle>Bài viết được tạo</CardTitle>
          </CardHeader>
          <CardContent>
            <PostsCreatedChart />
          </CardContent>
        </Card>
        */}
      </div>
    </div>
  );
}