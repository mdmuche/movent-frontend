function UserIcon() {
  const userAvatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  return (
    <button className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
      <img
        src={userAvatar}
        alt="User Profile"
        className="w-8 h-8 object-cover rounded-lg"
      />
    </button>
  );
}

export default UserIcon;
