function Step({ number, label, active }) {
  <div className="flex items-center gap-3 shrink-0">
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${active ? "bg-[#004d4d] text-white" : "bg-slate-200 text-slate-500"}`}
    >
      {number}
    </div>
    <span
      className={`font-black uppercase tracking-widest text-xs ${active ? "text-[#004d4d]" : "text-slate-400"}`}
    >
      {label}
    </span>
  </div>;
}

export default Step;
