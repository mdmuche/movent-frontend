function StepItem({ number, label, active }) {
  <div className="flex flex-col items-center gap-3 bg-white px-4">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${
        active
          ? "bg-[#00e5ff] text-[#004d4d] shadow-lg shadow-cyan-400/30"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      {number}
    </div>
    <span
      className={`text-[10px] font-black uppercase tracking-widest ${
        active ? "text-[#004d4d]" : "text-slate-400"
      }`}
    >
      {label}
    </span>
  </div>;
}

export default StepItem;
