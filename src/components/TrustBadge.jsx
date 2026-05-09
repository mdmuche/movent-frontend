function TrustBadge({ icon, label }) {
  <div className="flex flex-col items-center gap-2">
    <div className="text-slate-300">{icon}</div>
    <span className="text-[8px] font-black text-slate-400 tracking-tighter">
      {label}
    </span>
  </div>;
}

export default TrustBadge;
