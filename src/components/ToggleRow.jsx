function ToggleRow({ label, sub, active }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-black text-[#004d4d]">{label}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
          {sub}
        </p>
      </div>
      <div
        className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${active ? "bg-[#00e5ff]" : "bg-slate-200"}`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? "right-1" : "left-1"}`}
        />
      </div>
    </div>
  );
}
export default ToggleRow;
