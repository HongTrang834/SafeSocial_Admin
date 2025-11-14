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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { fetchWithAuth } from "@/lib/api";

interface ReportUser {
  _id: string;
  full_name: string;
  username: string;
  profile_picture: string;
}

interface ReportedPost {
  _id: string;
  content: string;
  image_urls: string[];
  user: ReportUser;
  createdAt: string;
}

// Kiểu dữ liệu chính cho Report
interface Report {
  _id: string;
  reporter: ReportUser;
  post: ReportedPost;   // Đã populate
  story: any;
  type: 'post' | 'story' | 'user' | 'comment';
  reason: string;
  status: 'pending' | 'reviewed' | 'dismissed'; //
  createdAt: string;
}

export default function ReportsManagement() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'reviewed' | 'dismissed'>('pending');

  // --- HÀM LẤY DỮ LIỆU ---
  const fetchReports = async () => {
    setIsLoading(true);
    try {
      // Dùng hàm helper (đã tự đính kèm Token)
      // API endpoint: GET /api/report/all
      // (Hãy chắc chắn prefix của bạn trong server.js là /api/reports)
      const data = await fetchWithAuth("/report/all", {
        method: 'GET',
      });

      if (data.success) {
        setReports(data.reports);
      } else {
        toast.error(data.message || "Không thể tải danh sách báo cáo.");
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi tải dữ liệu báo cáo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Tự động gọi fetchReports khi component được mount
  useEffect(() => {
    fetchReports();
  }, []);

  // --- HÀM HÀNH ĐỘNG CỦA ADMIN ---
  const handleUpdateStatus = async (reportId: string, status: 'reviewed' | 'dismissed') => {
    try {
      // API endpoint: PUT /api/report/:id
      const data = await fetchWithAuth(`/report/${reportId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }), // Gửi status mới
      });

      if (data.success) {
        toast.success(`Đã cập nhật báo cáo thành "${status}".`);
        fetchReports(); // Tải lại danh sách
      } else {
        toast.error(data.message || "Cập nhật thất bại.");
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi cập nhật báo cáo.");
    }
  };

  // Lọc danh sách reports dựa trên filter
  const filteredReports = reports.filter(report => report.status === filter);

  // --- RENDER ---
  if (isLoading) {
    return <div className="text-center p-10">Đang tải danh sách báo cáo...</div>;
  }

  return (
    <div className="space-y-4">

      {/* Bộ lọc Tabs */}
      <div className="flex space-x-100 border-b pb-2 mb-4 ">
        <Button
          variant={filter === 'pending' ? 'default' : 'ghost'}
          onClick={() => setFilter('pending')}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Đang chờ ({reports.filter(r => r.status === 'pending').length})
        </Button>
        <Button
          variant={filter === 'reviewed' ? 'default' : 'ghost'}
          onClick={() => setFilter('reviewed')}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Đã xử lý ({reports.filter(r => r.status === 'reviewed').length})
        </Button>
        <Button
          variant={filter === 'dismissed' ? 'default' : 'ghost'}
          onClick={() => setFilter('dismissed')}

        >
          <XCircle className="w-4 h-4 mr-2" />
          Đã bỏ qua ({reports.filter(r => r.status === 'dismissed').length})
        </Button>
      </div>

      {/* Bảng dữ liệu */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người báo cáo</TableHead>
              <TableHead>Lý do</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Nội dung bị báo cáo</TableHead>
              <TableHead>Ngày báo cáo</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Không có báo cáo nào trong mục này.
                </TableCell>
              </TableRow>
            ) : (
              filteredReports.map((report) => (
                <TableRow key={report._id}>
                  {/* Người báo cáo */}
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={report.reporter?.profile_picture} />
                        <AvatarFallback>
                          {report.reporter?.full_name.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{report.reporter?.full_name || "N/A"}</div>
                        <div className="text-xs text-muted-foreground">@{report.reporter?.username || "N/A"}</div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Lý do */}
                  <TableCell className="font-medium max-w-xs truncate" title={report.reason}>
                    {report.reason}
                  </TableCell>

                  {/* Loại */}
                  <TableCell>
                    <Badge variant="outline">{report.type?.toUpperCase() || "N/A"}</Badge>
                  </TableCell>

                  {/* Nội dung bị báo cáo */}
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {report.post ? (
                      <span title={report.post.content}>
                        Bài viết của <strong>{report.post.user?.full_name || "N/A"}</strong>: "{report.post.content}"
                      </span>
                    ) : report.story ? (
                      "Một Story (ID: " + report.story + ")"
                    ) : "N/A"}
                  </TableCell>

                  {/* Ngày báo cáo */}
                  <TableCell>
                    {new Date(report.createdAt).toLocaleDateString('vi-VN')}
                  </TableCell>

                  {/* Hành động */}
                  <TableCell className="text-right">
                    {report.status === 'pending' && (
                      <div className="flex justify-end space-x-2">
                        {/* Nút Duyệt */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                          onClick={() => handleUpdateStatus(report._id, 'reviewed')}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Xóa
                        </Button>
                        {/* Nút Bỏ qua */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-gray-500 border-gray-400 hover:bg-gray-100 hover:text-gray-700"
                          onClick={() => handleUpdateStatus(report._id, 'dismissed')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Bỏ qua
                        </Button>
                      </div>
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