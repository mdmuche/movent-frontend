function CategoryBtn({ icon, label, active }) {
  <button
    className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] border-2 transition-all group ${
      active
        ? "bg-white border-[#00e5ff] shadow-xl shadow-cyan-400/10"
        : "bg-slate-50 border-transparent hover:border-slate-200"
    }`}
  >
    <div
      className={`${active ? "text-[#00e5ff]" : "text-slate-300 group-hover:text-slate-400"} transition-colors`}
    >
      {icon}
    </div>
    <span
      className={`text-xs font-black uppercase tracking-widest ${active ? "text-[#004d4d]" : "text-slate-400"}`}
    >
      {label}
    </span>
  </button>;
}

export default CategoryBtn;
