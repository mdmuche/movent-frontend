import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navigation/Navbar";
import SideBar from "../../components/SideBar";

import { fetchOrganizerAnalytics } from "../../store/thunks/organizerThunks";
import KPI from "../../components/Kpi";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

function Analytics() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { analytics, loading } = useSelector((state) => state.organizer);
  const totalPages = analytics?.pagination?.pages || 1;

  useEffect(() => {
    dispatch(fetchOrganizerAnalytics({ page, limit: 10 }));
  }, [dispatch, page]);

  if (loading || !analytics) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-slate-500 font-bold">Loading analytics...</p>
      </div>
    );
  }

  // todo MOCK: later replace with real backend trend data
  const revenueData = analytics?.revenueTrend || [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 14000 },
    { month: "Apr", revenue: 22000 },
  ];

  const pieData = [
    { name: "Active", value: analytics.activeEvents },
    { name: "Upcoming", value: analytics.upcomingEvents },
    { name: "Past", value: analytics.pastEvents },
  ];

  const COLORS = ["#00C950", "#00E5FF", "#64748b"];

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-slate-50">
        <SideBar />

        <main className="flex-1 p-6 space-y-8">
          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-black">Analytics</h1>
            <p className="text-slate-500 text-sm">
              Overview of your events performance
            </p>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPI title="Revenue" value={`₦${analytics.totalRevenue}`} />
            <KPI title="Tickets Sold" value={analytics.totalTicketsSold} />
            <KPI title="Total Events" value={analytics.totalEvents} />
            <KPI title="Active Events" value={analytics.activeEvents} />
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LINE CHART */}
            <div className="bg-white p-6 rounded-2xl">
              <h2 className="font-bold mb-4">Revenue Trend</h2>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00C950"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* PIE CHART */}
            <div className="bg-white p-6 rounded-2xl">
              <h2 className="font-bold mb-4">Event Distribution</h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={100} label>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white p-6 rounded-2xl">
            <h2 className="font-bold mb-4">Recent Activity</h2>

            <div className="space-y-3">
              {analytics.recentActivity?.map((item, index) => (
                <div
                  key={item.createdAt + index}
                  className="flex justify-between text-sm pb-2"
                >
                  <div>
                    <p className="font-bold">{item.user.fullName}</p>
                    <p className="text-slate-500">{item.event.title}</p>
                  </div>

                  <p className="text-slate-400">
                    ₦{item.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={!analytics.pagination?.hasPrevPage}
                  className="px-4 py-2 text-sm bg-[#004d4d] text-white rounded-lg disabled:opacity-40"
                >
                  <CircleArrowLeft size={20} />
                </button>

                <p className="text-sm text-slate-500">
                  Page {analytics.pagination?.page || 1} of {totalPages}
                </p>

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!analytics.pagination?.hasNextPage}
                  className="px-4 py-2 text-sm bg-[#004d4d] text-white rounded-lg disabled:opacity-40"
                >
                  <CircleArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Analytics;
