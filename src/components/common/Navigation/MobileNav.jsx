import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NavIcons from "./NavIcons";

function MobileNav({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const role = user?.role;

  // 🔥 ROLE-BASED FILTERING (same logic as DesktopNav)
  const filteredLinks = navLinks.filter((link) => {
    if (!link.roles) return true; // public links

    if (!isAuthenticated) return false;

    return link.roles.includes(role);
  });

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b rounded-b-lg border-gray-100 shadow-xl z-50 px-4 sm:px-8">
          <div className="flex flex-col py-6 gap-6">
            {/* NAV LINKS */}
            {filteredLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-semibold transition-colors ${
                  location.pathname === link.path
                    ? "text-[#00c9a0]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="my-2 border-gray-100" />

            {/* ICONS SECTION */}
            <div className="flex items-center justify-around py-3 bg-gray-50 rounded-xl">
              <NavIcons />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
