import { useSelector } from "react-redux";

function UserIcon() {
  const { profile } = useSelector((state) => state.user);

  const userAvatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  return (
    <button className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
      <img
        src={
          profile?.user?.profilePicture
            ? profile.user.profilePicture
            : userAvatar
        }
        alt={profile?.user?.fullName || "User Profile"}
        className="w-9 h-9 rounded-full object-cover border border-gray-200"
      />
    </button>
  );
}

export default UserIcon;
