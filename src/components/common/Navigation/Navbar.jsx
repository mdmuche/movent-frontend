import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

function Navbar() {
  const navLinks = [
    { name: "Explore", path: "/explore" },
    { name: "Create Event", path: "/create-event" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="relative bg-white border-gray-100 z-[100] px-4 sm:px-8 lg:px-20">
      <div className="flex items-center justify-between h-16 md:h-20 max-w-7xl mx-auto">
        <Link
          to="/"
          className="font-extrabold text-xl tracking-tight text-gray-900 font-['Syne'] mr-10"
        >
          Movent
        </Link>

        <DesktopNav navLinks={navLinks} />
        <MobileNav navLinks={navLinks} />
      </div>
    </nav>
  );
}

export default Navbar;
