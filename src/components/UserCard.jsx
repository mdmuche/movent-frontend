import { MoreVertical } from "lucide-react";

function UserCard({
  name,
  email,
  tag,
  member,
  meta,
  initials,
  color,
  flagged,
}) {
  return (
    <div className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center font-black text-lg group-hover:scale-105 transition-all`}
        >
          {initials}
        </div>
        <button className="p-1 text-slate-300 hover:text-slate-600">
          <MoreVertical size={20} />
        </button>
      </div>
      <div className="mb-6">
        <h4 className="font-black text-slate-900 mb-1">{name}</h4>
        <p className="text-xs font-bold text-slate-400">{email}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 bg-white border border-slate-200 text-[10px] font-black uppercase text-slate-500 rounded-lg">
          {tag}
        </span>
        <span
          className={`px-3 py-1 bg-white border border-slate-200 text-[10px] font-black uppercase rounded-lg ${flagged ? "text-red-400" : "text-cyan-500"}`}
        >
          {member}
        </span>
      </div>
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
          Joined 14 May, 2023
        </p>
        <p className="text-xs font-black text-slate-900">{meta}</p>
      </div>
    </div>
  );
}

export default UserCard;
