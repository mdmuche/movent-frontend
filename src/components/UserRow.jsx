import { MoreVertical } from "lucide-react";

function UserRow({ name, email, tag, member, meta, flagged, createdAt }) {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100 hover:bg-slate-50 transition-all">
      {/* LEFT: Avatar + user info */}
      <div className="flex items-center gap-4">
        <div>
          <h4 className="font-black text-slate-900 text-sm">{name}</h4>
          <p className="text-xs text-slate-400">{email}</p>
        </div>
      </div>

      {/* MIDDLE: tags */}
      <div className="hidden md:flex items-center gap-2">
        <span className="px-2 py-1 bg-slate-100 text-[10px] font-black uppercase text-slate-500 rounded-md">
          {tag}
        </span>

        <span
          className={`px-2 py-1 bg-slate-100 text-[10px] font-black uppercase rounded-md ${
            flagged ? "text-red-500" : "text-cyan-600"
          }`}
        >
          {member}
        </span>
      </div>

      {/* RIGHT: meta + actions */}
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-400 font-bold uppercase">
            Joined
          </p>
          <p className="text-xs font-black text-slate-900">{createdAt}</p>
        </div>

        <p className="text-xs font-black text-slate-900 hidden md:block">
          {meta}
        </p>

        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}

export default UserRow;
