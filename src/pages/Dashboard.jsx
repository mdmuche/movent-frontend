import {
  Ticket,
  Calendar,
  BarChart3,
  Plus,
  Download,
  MapPin,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  Mail,
} from "lucide-react";
import SideBar from "../components/SideBar";
import Navbar from "../components/common/Navigation/Navbar";
import { recentActivity, upcomingEvents } from "../data/moventData";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";

const IconRenderer = ({ type }) => {
  switch (type) {
    case "check":
      return <CheckCircle2 className="text-cyan-500" size={16} />;
    case "mail":
      return <Mail className="text-gray-400" size={16} />;
    default:
      return null;
  }
};

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
        {/* Sidebar - Hidden on mobile, fixed on desktop */}
        <SideBar />
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-black text-slate-900 font-['Syne'] tracking-tight">
                Architectural Dashboard
              </h1>
              <p className="text-gray-500 font-medium">
                Welcome back, Alex. Your curation looks exceptional today.
              </p>
            </div>
            <Link to="/create-event">
              <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 px-6 sm:px-4 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-400/20 transition-all active:scale-95 cursor-pointer">
                <Plus size={20} /> Create New Event
              </button>
            </Link>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Credit Balance */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">
                Credit Balance
              </p>
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                $14,280.50
              </h2>
              <div className="flex items-center gap-1 text-[#00c9a0] text-xs font-bold">
                <ArrowUpRight size={14} /> +12% from last month
              </div>
            </div>

            {/* Active Events */}
            <div className="bg-[#004d4d] p-6 rounded-[2rem] shadow-lg text-white">
              <p className="text-xs font-bold opacity-70 uppercase mb-2">
                Active Events
              </p>
              <h2 className="text-3xl font-black mb-2">12</h2>
              <div className="flex items-center gap-1 opacity-70 text-xs">
                <BarChart3 size={14} /> 4,102 Total Attendees
              </div>
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between">
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Total Revenue
                </p>
                <div className="flex items-end gap-1.5 h-12">
                  {[40, 70, 45, 90, 65].map((h, i) => (
                    <div
                      key={i}
                      className="w-2.5 bg-cyan-400 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>
              <button className="text-[#00c9a0] text-xs font-bold text-left hover:underline mt-4">
                View Analytics Report
              </button>
            </div>
          </div>

          {/* Bottom Section: Events + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Upcoming Experiences List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-end mb-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Upcoming Experiences
                </h3>
                <button className="text-xs font-bold text-gray-400 hover:text-slate-900">
                  View All
                </button>
              </div>

              {/* Event Item */}
              {upcomingEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-3xl border border-gray-100 flex gap-6 hover:shadow-md transition-shadow"
                >
                  <img
                    src={event.img}
                    className="w-32 h-32 rounded-2xl object-cover"
                    alt="event"
                  />
                  <div className="flex-1 py-2 relative">
                    <span className="absolute top-0 right-0 bg-gray-100 text-[10px] font-black text-gray-500 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {event.tag}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">
                      {event.title}
                    </h4>
                    <div className="flex gap-4 text-xs text-gray-400 font-medium mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {event.loc}
                      </span>
                    </div>
                    <button className="flex items-center gap-2 text-[#00c9a0] font-bold text-xs hover:underline">
                      Download Digital Pass <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Sidebar */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-6 border-l-2 border-gray-100 ml-3 pl-6 relative">
                  {recentActivity.map((act, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[35px] top-0 bg-white p-1 rounded-full border-2 border-gray-50">
                        <IconRenderer type={act.iconType} />
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {act.type}
                      </p>
                      <p className="text-xs text-gray-500 leading-tight mb-1">
                        {act.desc}
                      </p>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                        {act.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Growth Small Card */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-sm">Revenue Growth</h4>
                  <MoreHorizontal size={16} className="text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-50 rounded-lg text-cyan-500">
                        <Ticket size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Tickets Sold</p>
                        <p className="text-[10px] text-gray-400">
                          Current Month
                        </p>
                      </div>
                    </div>
                    <span className="font-black text-slate-900">842</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500">
                        <BarChart3 size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Net Earnings</p>
                        <p className="text-[10px] text-gray-400">
                          Current Month
                        </p>
                      </div>
                    </div>
                    <span className="font-black text-slate-900">$12.4k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
