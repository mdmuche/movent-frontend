import {
  BarChart3,
  Bookmark,
  Calendar,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SideBar() {
  const { profile } = useSelector((state) => state.user);
  const role = profile?.user?.role || null;

  const navClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${
      isActive ? "bg-[#004d4d] text-white" : "text-gray-500 hover:bg-gray-50"
    }`;

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col p-6 space-y-8">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        Management
      </div>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={navClass}>
          <LayoutDashboard size={20} /> Overview
        </NavLink>

        <NavLink to="/my-events" className={navClass}>
          <Bookmark size={20} />
          My Events
        </NavLink>

        {role === "organizer" && (
          <>
            <NavLink to="/organizer-events" className={navClass}>
              <Calendar size={20} /> Manage Events
            </NavLink>

            <NavLink to="/analytics" className={navClass}>
              <BarChart3 size={20} /> Analytics
            </NavLink>
          </>
        )}

        <NavLink to="/profile" className={navClass}>
          <Settings size={20} /> Settings
        </NavLink>
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
