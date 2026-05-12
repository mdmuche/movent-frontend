function SocialBtn({ label }) {
  return (
    <button className="flex items-center justify-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
        {label}
      </span>
    </button>
  );
}

export default SocialBtn;
