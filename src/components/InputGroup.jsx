function InputGroup({ label, placeholder, type = "text" }) {
  return (
    <div className="space-y-2 text-left">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-[#004d4d] transition-all"
      />
    </div>
  );
}
export default InputGroup;
