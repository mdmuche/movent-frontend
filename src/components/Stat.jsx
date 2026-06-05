function Stat({ label, value }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
      <p className="text-2xl font-black text-[#004d4d] tracking-tight">
        {value ?? 0}
      </p>

      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  );
}

export default Stat;
