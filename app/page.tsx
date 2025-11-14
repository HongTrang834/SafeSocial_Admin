import DashboardOverview from "@/components/analytics-dashboard"

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-slate-100">
      <main className="flex-1 overflow-y-auto bg-slate-100">
        <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-6">
            <h1 className="text-3xl font-bold text-slate-900">Trang chủ</h1>
            <div className="flex items-center gap-4">
              <select
                defaultValue="Last 30 Days"
                className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 font-medium hover:border-slate-400 transition-colors cursor-pointer"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
        </div>
        <DashboardOverview />
      </main>
    </div>
  )
}
