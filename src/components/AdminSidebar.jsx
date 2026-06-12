import {
  CalendarClock,
  FileSearch,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import SidebarLink from "./SidebarLink";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AdminSidebar() {
  const { eventQueue } = useSelector((state) => state.admin);

  return (
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
            badge={eventQueue.length}
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
  );
}

export default AdminSidebar;
