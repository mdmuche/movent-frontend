import {
  LayoutDashboard,
  CalendarClock,
  Users,
  Settings,
  FileSearch,
  Download,
  Ticket,
  Activity,
  Search,
  Bell,
  Filter,
  Music,
  MapPin,
} from "lucide-react";
import SidebarLink from "../../components/SidebarLink";
import UserCard from "../../components/UserCard";
import EventRow from "../../components/EventRow";
import InsightItem from "../../components/InsightItem";
import StatCard from "../../components/StatCard";
import WalletIcon from "../../components/WalletIcon";
import { events } from "../../data/moventData";
import Footer from "../../components/common/Footer";
import UserIcon from "../../components/common/UserIcon";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-900">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link to="/">
            <h1 className="text-2xl font-black text-[#004d4d]">Movent</h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-8">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">
              Core Management
            </p>
            <SidebarLink
              icon={<LayoutDashboard size={20} />}
              label="Platform Overview"
              active
            />
            <SidebarLink
              icon={<CalendarClock size={20} />}
              label="Event Queue"
              badge="12"
            />
            <SidebarLink icon={<Users size={20} />} label="User Registry" />
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">
              Infrastructure
            </p>
            <SidebarLink
              icon={<Settings className="bg-red-500" size={20} />}
              label="System Configuration"
            />
            <SidebarLink icon={<FileSearch size={20} />} label="Audit Logs" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-8">
            <Link to="/">
              <h1 className="lg:hidden text-xl font-black text-[#004d4d] cursor-pointer">
                Moventjj
              </h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500">
              <Link
                to="/"
                className="text-[#00C950] border-b-2 border-[#00C950] pb-1"
              >
                Home
              </Link>
              <Link to="/explore" className="hover:text-slate-800">
                Explore
              </Link>
              <Link to="/create-event" className="hover:text-slate-800">
                Create Event
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-64 border border-transparent focus-within:border-slate-300 transition-all">
              <Search size={18} className="text-slate-400" />
              <input
                placeholder="Search operations..."
                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900">Admin</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  System Admin
                </p>
              </div>
              <UserIcon />
            </div>
          </div>
        </header>

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
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
                <Download size={18} /> Export Report
              </button>
              <button className="bg-[#00e5ff] text-[#004d4d] px-6 py-2.5 rounded-xl font-black text-sm hover:brightness-105 transition-all shadow-lg shadow-cyan-100">
                Refresh Data
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              icon={<WalletIcon />}
              label="Total Sales"
              value="$1,284,500"
              trend="+ 12.5%"
            />
            <StatCard
              icon={<Users size={20} className="text-cyan-500" />}
              label="Active Users"
              value="42,891"
              trend="+ 5.2%"
            />
            <StatCard
              icon={<Ticket size={20} className="text-orange-500" />}
              label="Tickets Issued"
              value="156,204"
              trend="+ 1.2%"
            />
            <StatCard
              icon={<Activity size={20} className="text-[#00C950]" />}
              label="Platform Uptime"
              value="99.98%"
              status="LIVE"
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
                    value="San Francisco, CA"
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
                {events.map((event) => (
                  <EventRow
                    key={event.id}
                    name={event.title}
                    sub={event.category}
                    org={event.organization}
                    date={event.date}
                    cap={event.capacity}
                    image={event.image}
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <UserCard
                name="Jane Doe"
                email="jane.doe@example.com"
                tag="Organizer"
                member="Pro Member"
                meta="128 Sales"
                initials="JD"
                color="bg-cyan-100 text-cyan-600"
              />
              <UserCard
                name="Marcus Sterling"
                email="m.sterling@agency.com"
                tag="Standard"
                member="Verified"
                meta="42 Purchases"
                initials="MS"
                color="bg-slate-100 text-slate-600"
              />
              <UserCard
                name="Aria Loft"
                email="aria@loftevents.com"
                tag="Organizer"
                member="Flagged"
                meta="89 Sales"
                initials="AL"
                color="bg-orange-100 text-orange-600"
                flagged
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default AdminDashboard;
