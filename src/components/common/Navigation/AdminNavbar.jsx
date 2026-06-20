import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { Bell, Search } from "lucide-react";
import UserIcon from "../UserIcon";

function AdminNavbar() {
  const navLinks = [
    { name: "Explore", path: "/" },
    { name: "Create Event", path: "/create-event" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Admin Dashboard", path: "/admin-dashboard" },
    { name: "Profile", path: "/profile" },
    {},
  ];

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-72 bg-white border-b border-slate-200 px-4 lg:px-8 py-4 lg:flex lg:flex-col xl:flex-row lg:gap-4 items-center justify-between z-50">
      <div className="flex items-center justify-between lg:justify-center w-full">
        <Link to="/">
          <h1 className="lg:hidden text-xl font-black text-[#004d4d] cursor-pointer">
            Movent
          </h1>
        </Link>
        <MobileNav navLinks={navLinks} />
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500">
          <Link
            to="/"
            className="text-[#00C950] border-b-2 border-[#00C950] pb-1"
          >
            Home
          </Link>
          <Link to="/" className="hover:text-slate-800">
            Discover Events
          </Link>
          <Link to="/create-event" className="hover:text-slate-800">
            Create Event
          </Link>
        </nav>
      </div>

      <div className="hidden w-full sm:flex justify-between items-center gap-4 lg:gap-6">
        <div className="hidden sm:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-64 border border-transparent focus-within:border-slate-300 transition-all">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search operations..."
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link to='/notifications' className="p-2 text-slate-400 hover:text-slate-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Link>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900">Admin</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                System Admin
              </p>
            </div>
            <Link to="/profile">
              <UserIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
