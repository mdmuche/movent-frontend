import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserIcon from "../UserIcon";

function NavIcons() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.user);

  if (!isAuthenticated) return null;

  return (
    <>
      <Link to='/notifications' className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
        <Bell size={16} className="text-gray-600" />
      </Link>

      <Link to="/profile">
        {profile?.user?.profilePicture ? (
          <img
            src={profile.user.profilePicture}
            alt={profile.user.fullName}
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <UserIcon />
        )}
      </Link>
    </>
  );
}

export default NavIcons;
