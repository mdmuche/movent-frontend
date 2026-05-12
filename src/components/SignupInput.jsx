function SignupInput({ label, placeholder, type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#f1f4f4] rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[#00e5ff]"
      />
    </div>
  );
}

export default SignupInput;
