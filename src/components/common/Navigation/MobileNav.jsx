import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NavIcons from "./NavIcons";

function MobileNav({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { profile, isAuthenticated } = useSelector((state) => state.user);
  const role = profile?.user?.role || null;

  const filteredLinks = navLinks.filter((link) => {
    if (!link.roles) return true;
    if (!isAuthenticated) return false;
    return link.roles.includes(role);
  });

  const regularLinks = filteredLinks.filter((link) => !link.button);
  const buttonLinks = filteredLinks.filter((link) => link.button);

  return (
    <div className="md:hidden">
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-xl z-50">
          <div className="flex flex-col gap-6 px-6 py-6 w-full overflow-x-hidden">
            {/* LINKS */}
            {regularLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-semibold ${
                  location.pathname === link.path
                    ? "text-[#00c9a0]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* BUTTON */}
            {buttonLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#004d4d] text-white py-3 rounded-xl font-semibold"
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-gray-100" />

            {/* ICONS */}
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
