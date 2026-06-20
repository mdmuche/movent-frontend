import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  flagUser,
  suspendUser,
  makeOrganizer,
} from "../store/thunks/adminThunks";

function UserRow({ user }) {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFlagUser = async () => {
    try {
      const res = await dispatch(flagUser(user._id)).unwrap();
      toast.success(res.message);
      setOpen(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleMakeOrganizer = async () => {
    try {
      const res = await dispatch(makeOrganizer(user._id)).unwrap();
      toast.success(res.message);
      setOpen(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSuspendUser = async () => {
    const reason = prompt("Reason for suspension:");

    if (!reason) return;

    try {
      const res = await dispatch(
        suspendUser({
          userId: user._id,
          data: { reason },
        }),
      ).unwrap();

      toast.success(res.message);
      setOpen(false);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-menu")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative user-menu">
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100 hover:bg-slate-50 transition-all">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div>
            <h4 className="font-black text-slate-900 text-sm">
              {user.fullName}
            </h4>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="hidden md:flex items-center gap-2">
          <span className="px-2 py-1 bg-slate-100 text-[10px] font-black uppercase text-slate-500 rounded-md">
            {user.role}
          </span>

          <span
            className={`px-2 py-1 text-[10px] font-black uppercase rounded-md ${user.isVerifiedOrganizer
              ? "text-cyan-600"
              : "text-slate-500"
              }`}
          >
            {user.isVerifiedOrganizer ? "Verified" : "Standard"}
          </span>

          {user.isFlagged && (
            <span className="px-2 py-1 text-[10px] font-black uppercase rounded-md text-red-500 bg-red-50">
              Flagged
            </span>
          )}

          {user.status === "suspended" && (
            <span className="px-2 py-1 text-[10px] font-black uppercase rounded-md text-red-600 bg-red-100">
              Suspended
            </span>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 font-bold uppercase">
              Joined
            </p>
            <p className="text-xs font-black text-slate-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="relative">
            <button onClick={() => setOpen((prev) => !prev)}>
              <MoreVertical size={18} />
            </button>

            {open && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg w-44 z-50">

                <button
                  onClick={handleMakeOrganizer}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-50"
                >
                  Make Organizer
                </button>

                <button
                  onClick={handleFlagUser}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-50"
                >
                  Flag User
                </button>

                <button
                  onClick={handleSuspendUser}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                >
                  Suspend User
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRow;