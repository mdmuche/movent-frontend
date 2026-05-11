import { TrendingUp } from "lucide-react";

function StatCard({ icon, label, value, trend, status }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white group-hover:scale-110 transition-all border border-transparent group-hover:border-slate-100">
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] font-black text-[#00C950] flex items-center gap-1">
            <TrendingUp size={12} /> {trend}
          </span>
        )}
        {status && (
          <span className="text-[10px] font-black text-slate-400 flex items-center gap-2 tracking-widest">
            <span className="w-2 h-2 bg-[#00C950] rounded-full animate-pulse"></span>{" "}
            {status}
          </span>
        )}
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-2xl font-black text-[#004d4d]">{value}</p>
    </div>
  );
}

export default StatCard;
