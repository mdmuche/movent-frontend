import { Bell, Settings } from "lucide-react";

const userAvatar =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

function NavIcons() {
  return (
    <>
      <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
        <Bell size={16} className="text-gray-600" />
      </button>
      <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
        <Settings size={16} className="text-gray-600" />
      </button>
      <button className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
        <img
          src={userAvatar}
          alt="User Profile"
          className="w-8 h-8 object-cover rounded-lg"
        />
      </button>
    </>
  );
}

export default NavIcons;
