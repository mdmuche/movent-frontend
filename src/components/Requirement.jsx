import { CheckCircle2 } from "lucide-react";

function Requirement({ text, met }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={14}
        className={met ? "text-emerald-500" : "text-slate-300"}
      />
      <span
        className={`text-[10px] font-bold uppercase tracking-tight ${met ? "text-slate-600" : "text-slate-400"}`}
      >
        {text}
      </span>
    </div>
  );
}

export default Requirement;
