import { BarChart3, Calendar, Settings, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col p-6 space-y-8">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        Management
      </div>

      <nav className="space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#004d4d] text-white rounded-xl font-bold transition-all cursor-pointer">
          <Ticket size={20} /> My Tickets
        </button>
        <Link to="/upcoming-events">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
            <Calendar size={20} /> My Events
          </button>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
          <BarChart3 size={20} /> Analytics
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
          <Settings size={20} /> Settings
        </button>
      </nav>

      {/* Profile Completion Card */}
      <div className="mt-auto bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase">
            Profile Completion
          </span>
          <span className="text-[10px] font-bold text-[#004d4d]">85%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
          <div
            className="bg-[#00c9a0] h-1.5 rounded-full"
            style={{ width: "85%" }}
          ></div>
        </div>
        <p className="text-[10px] text-gray-400 leading-tight">
          Complete your profile to unlock exclusive curator badges.
        </p>
      </div>
    </aside>
  );
}

export default SideBar;
