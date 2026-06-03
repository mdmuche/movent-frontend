import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import NavIcons from "./NavIcons";

// 1. Desktop Navigation Component
function DesktopNav({ navLinks }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const role = user?.role;
  const location = useLocation();

  // FILTER LINKS BASED ON ROLE
  const filteredLinks = navLinks.filter((link) => {
    if (!link.roles) return true; // public links

    if (!isAuthenticated) return false;

    return link.roles.includes(role);
  });

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      {/* LEFT NAV LINKS */}
      <div className="flex items-center gap-8">
        {filteredLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium transition-colors ${
              location.pathname === link.path
                ? "text-[#00c9a0] border-b-2 border-[#00c9a0] pb-1"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-3">
        <NavIcons />
      </div>
    </div>
  );
}

export default DesktopNav;
