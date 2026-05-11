function InsightItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#00C950]/20 transition-all text-emerald-400">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-emerald-100/50 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-black text-white">{value}</p>
      </div>
    </div>
  );
}

export default InsightItem;
