import {
  CalendarClock,
  Users,
  Activity,
  Search,
  Filter,
  Music,
  MapPin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EventRow from "../../components/EventRow";
import InsightItem from "../../components/InsightItem";
import StatCard from "../../components/StatCard";
import WalletIcon from "../../components/WalletIcon";
import Footer from "../../components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  exportReport,
  getAllUsers,
  getEventQueue,
  getPlatformOverview,
} from "../../store/thunks/adminThunks";
import UserRow from "../../components/UserRow";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/common/Navigation/AdminNavbar";

function AdminDashboard() {
  const [exportOpen, setExportOpen] = useState(false);

  const dispatch = useDispatch();

  const exportRef = useRef();

  const { overview, eventQueue, users, loading, exportLoading } = useSelector(
    (state) => state.admin,
  );

  const handleExport = (format) => {
    dispatch(exportReport(format));
    setExportOpen(false);
  };

  useEffect(() => {
    dispatch(getPlatformOverview());

    dispatch(
      getEventQueue({
        page: 1,
        limit: 10,
      }),
    );

    dispatch(
      getAllUsers({
        page: 1,
        limit: 6,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setExportOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading && !overview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-bold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-900">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <AdminNavbar />
        <div className="h-16 sm:h-28 lg:h-32 xl:h-20" aria-hidden="true" />

        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8">
          {/* Dashboard Intro */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 font-['Syne'] tracking-tight">
                Platform Overview
              </h2>
              <p className="text-slate-500 font-medium">
                Central nervous system for Movent ticketing operations.
              </p>
            </div>
            <div className="relative" ref={exportRef}>
              {/* MAIN BUTTON */}
              <button
                onClick={() => setExportOpen((prev) => !prev)}
                disabled={exportLoading}
                className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-60"
              >
                {exportLoading ? (
                  <>
                    <span className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                    Exporting...
                  </>
                ) : (
                  <>
                    Export Report
                    <span className="text-xs">▾</span>
                  </>
                )}
              </button>

              {/* DROPDOWN */}
              {exportOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <button
                    onClick={() => handleExport("csv")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                  >
                    Export as CSV
                  </button>

                  <button
                    onClick={() => handleExport("xlsx")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                  >
                    Export as Excel
                  </button>

                  <button
                    onClick={() => handleExport("pdf")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                  >
                    Export as PDF
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              icon={<WalletIcon />}
              label="Total Revenue"
              value={`₦${overview?.totalRevenue?.toLocaleString() || 0}`}
            />

            <StatCard
              icon={<Users size={20} className="text-cyan-500" />}
              label="Total Users"
              value={overview?.totalUsers?.toLocaleString() || 0}
            />

            <StatCard
              icon={<CalendarClock size={20} className="text-[#00C950]" />}
              label="Total Events"
              value={overview?.totalEvents?.toLocaleString() || 0}
            />

            <StatCard
              icon={<CalendarClock size={20} className="text-[#00C950]" />}
              label="Pending Events"
              value={overview?.pendingEvents?.toLocaleString() || 0}
            />

            <StatCard
              icon={<Activity size={20} className="text-red-500" />}
              label="Pending Approval"
              value={overview?.pendingEvents?.toLocaleString() || 0}
            />
          </div>

          {/* Chart & Insights Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Revenue Trends
                  </h3>
                  <p className="text-xs font-bold text-slate-400">
                    Monthly growth comparison across regions
                  </p>
                </div>
                <select className="bg-slate-50 border-none rounded-lg text-xs font-bold px-4 py-2">
                  <option>Last 6 Months</option>
                </select>
              </div>
              <div className="h-[300px] flex items-end justify-between px-4 pb-4 border-b border-slate-100">
                {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((month, i) => (
                  <div
                    key={month}
                    className="flex flex-col items-center gap-4 w-full"
                  >
                    <div className="w-8 lg:w-12 bg-slate-50 rounded-t-lg relative h-full flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#00e5ff]/20"
                        style={{ height: `${20 + i * 12}%` }}
                      ></div>
                      <div
                        className="absolute bottom-0 w-full bg-[#004d4d]/10"
                        style={{ height: `${10 + i * 8}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest">
                      {month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#004d4d] rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-4">Market Insights</h3>
                <p className="text-emerald-100/70 text-sm font-medium leading-relaxed mb-8">
                  Our AI suggests a 15% increase in concert bookings next month
                  based on current trends.
                </p>
                <div className="space-y-6">
                  <InsightItem
                    icon={<Music size={18} />}
                    label="Top Category"
                    value="Live Concerts"
                  />
                  <InsightItem
                    icon={<MapPin size={18} />}
                    label="Hot Zone"
                    value="Ikeja, Lagos"
                  />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Event Queue Table */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm overflow-x-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Event Approval Queue
                </h3>
                <p className="text-xs font-bold text-slate-400">
                  Review pending event submissions for quality control.
                </p>
              </div>
              <button className="text-[#00C950] text-xs font-black uppercase tracking-widest hover:underline">
                View All Queue &rsaquo;
              </button>
            </div>
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-4">Event Name</th>
                  <th className="pb-4">Organizer</th>
                  <th className="pb-4">Date Requested</th>
                  <th className="pb-4">Capacity</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {eventQueue.slice(0, 3).map((event) => (
                  <EventRow
                    key={event._id}
                    name={event.title}
                    sub={event.category}
                    org={event.organizer?.fullName}
                    date={new Date(event.createdAt).toLocaleDateString()}
                    cap={event.totalTickets} //todo just for testing use capacity
                    image={event.bannerImage.secure_url}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* User Registry Cards */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  User Registry
                </h3>
                <p className="text-xs font-bold text-slate-400">
                  Comprehensive database of active platform participants.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2 border border-transparent focus-within:border-slate-300 transition-all">
                  <Search size={16} className="text-slate-400" />
                  <input
                    placeholder="Filter by name, email..."
                    className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-48 font-bold"
                  />
                </div>
                <button className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            {users.slice(0, 3).map((user) => (
              <UserRow
                key={user._id}
                name={user.fullName}
                email={user.email}
                tag={user.role}
                member={user.isVerifiedOrganizer ? "Verified" : "Standard"}
                meta={`${new Date(user.createdAt).toLocaleDateString()}`}
              />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default AdminDashboard;
