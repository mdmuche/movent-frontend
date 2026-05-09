import { Link, useLocation } from "react-router-dom";
import NavIcons from "./NavIcons";

// 1. Desktop Navigation Component
function DesktopNav({ navLinks }) {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
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

      <div className="flex items-center gap-3">
        <NavIcons />
      </div>
    </div>
  );
}
export default DesktopNav;
