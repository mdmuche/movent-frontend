import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function InputField({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  as = "input", // 👈 new prop
  rows = 4,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>

      <div className="relative">
        {as === "textarea" ? (
          <textarea
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full bg-[#f1f4f4] rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[#00e5ff]"
          />
        ) : (
          <input
            type={isPasswordField ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-[#f1f4f4] rounded-2xl p-4 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[#00e5ff]"
          />
        )}

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-slate-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
