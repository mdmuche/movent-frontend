import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Discover Events", path: "/events" },
    {
      name: "Create Event",
      path: "/create-event",
    },
    { name: "Dashboard", path: "/dashboard", roles: ["attendee", "organizer"] },
    { name: "Admin Dashboard", path: "/admin-dashboard", roles: ["admin"] },
  ];

  const finalNavLinks = [
    ...navLinks,
    ...(!isAuthenticated
      ? [{ name: "Get Started", path: "/login", button: true }]
      : []),
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full bg-white border-gray-100 z-[100] px-4 sm:px-8 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20 max-w-7xl mx-auto">
          <Link
            to="/"
            className="font-extrabold text-2xl text-[#004d4d] cursor-pointer tracking-tight font-['Syne'] italic mr-10"
          >
            <h1 className="">Movent</h1>
          </Link>
          <DesktopNav navLinks={finalNavLinks} />
          <MobileNav navLinks={finalNavLinks} />
        </div>
      </nav>
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}

export default Navbar;
