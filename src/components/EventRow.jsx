function EventRow({ name, sub, org, date, cap, image }) {
  return (
    <tr className="group hover:bg-slate-50/50 transition-all">
      <td className="py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-xl shrink-0 overflow-hidden opacity-90 group-hover:opacity-100 transition-all">
            <img src={image} alt={name} />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">{name}</p>
            <p className="text-[10px] font-bold text-slate-400">{sub}</p>
          </div>
        </div>
      </td>
      <td className="py-6 text-sm font-bold text-slate-600">{org}</td>
      <td className="py-6 text-sm font-bold text-slate-600">{date}</td>
      <td className="py-6 text-sm font-black text-slate-900">{cap}</td>
      <td className="py-6">
        <div className="flex items-center justify-end gap-2">
          <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg">
            Reject
          </button>
          <button className="px-4 py-2 text-xs font-bold bg-[#00e5ff] text-[#004d4d] rounded-lg hover:brightness-105 shadow-sm">
            Approve
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EventRow;
