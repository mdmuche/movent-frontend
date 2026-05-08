import { Bell, Settings, User } from "lucide-react";

const NavIcons = () => (
  <>
    <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
      <Bell size={16} className="text-gray-600" />
    </button>
    <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
      <Settings size={16} className="text-gray-600" />
    </button>
    <button className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
      <User size={18} className="text-gray-600" />
    </button>
  </>
);

export default NavIcons;
