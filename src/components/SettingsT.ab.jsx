import { ChevronRight } from "lucide-react";

function SettingsTab({ icon, label, active, variant }) {
  return (
    <button
      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
        active
          ? "bg-[#e6f4f4] text-[#004d4d]"
          : "text-slate-400 hover:bg-slate-50"
      }`}
    >
      <div
        className={`flex items-center gap-4 ${variant === "danger" ? "text-red-500" : ""}`}
      >
        {icon} <span className="text-sm font-black">{label}</span>
      </div>
      {!variant && <ChevronRight size={16} className="opacity-20" />}
    </button>
  );
}

export default SettingsTab;
