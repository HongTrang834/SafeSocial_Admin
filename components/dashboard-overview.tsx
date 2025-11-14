// components/dashboard-overview.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, FileText, FileWarning, BarChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { fetchWithAuth } from "@/lib/api"; // Import hàm helper
import { toast } from "sonner";

// Kiểu dữ liệu cho Stats Cards
interface StatsCardsData {
  totalUsers: number;
  totalPosts: number;
  totalReports: number;
  pendingReports: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<StatsCardsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        // API endpoint: GET /api/analytics/stats-cards
        const data = await fetchWithAuth("/analytics/stats-cards");

        if (data.success) {
          setStats(data.stats);
        } else {
          toast.error(data.message || "Lỗi khi tải chỉ số thống kê.");
        }
      } catch (error: any) {
        toast.error("Lỗi khi tải dữ liệu: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Giao diện khi đang tải
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    );
  }

  // Giao diện khi đã có dữ liệu
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Thẻ Tổng Người dùng */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng Người dùng</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalUsers ?? 0}</div>
        </CardContent>
      </Card>

      {/* Thẻ Tổng Bài viết */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng Bài viết</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalPosts ?? 0}</div>
        </CardContent>
      </Card>

      {/* Thẻ Tổng Báo cáo */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng Báo cáo</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalReports ?? 0}</div>
        </CardContent>
      </Card>

      {/* Thẻ Báo cáo chờ xử lý */}
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
  );
}