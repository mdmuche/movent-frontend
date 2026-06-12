import { NavLink } from "react-router-dom";

function SidebarLink({ icon, label, badge, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
          isActive
            ? "bg-cyan-50 text-[#004d4d] font-bold shadow-sm border border-cyan-100"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
        }`
      }
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-bold">{label}</span>
      </div>

      {badge && (
        <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default SidebarLink;
