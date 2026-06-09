import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import NavIcons from "./NavIcons";

// 1. Desktop Navigation Component
function DesktopNav({ navLinks }) {
  const { profile, isAuthenticated } = useSelector((state) => state.user);
  console.log(profile?.user);
  const role = profile?.user?.role || null;
  console.log(profile?.user.role);
  const location = useLocation();

  // FILTER LINKS BASED ON ROLE
  const filteredLinks = navLinks.filter((link) => {
    if (!link.roles) return true; // public links

    if (!isAuthenticated) return false;

    return link.roles.includes(role);
  });

  const regularLinks = filteredLinks.filter((link) => !link.button);
  const buttonLinks = filteredLinks.filter((link) => link.button);

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      {/* Left side */}
      <div className="flex items-center gap-8">
        {regularLinks.map((link) => (
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

      {/* Right side */}
      <div className="flex items-center gap-4">
        <NavIcons />

        {buttonLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="bg-[#004d4d] text-white px-4 py-2 rounded-lg hover:bg-[#003a3a] transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DesktopNav;
