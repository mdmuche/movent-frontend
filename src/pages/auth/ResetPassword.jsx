import { ShieldCheck, EyeOff } from "lucide-react";
import Requirement from "../../components/Requirement";

function ResetPassword() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00e5ff] to-[#004d4d]" />

        <div className="p-8 md:p-12">
          <header className="mb-10">
            <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-[#00e5ff] mb-6">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3">
              Reset Password
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Almost there. Please choose a strong new password for your
              account.
            </p>
          </header>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#f1f4f4] border-none rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-[#00e5ff] outline-none transition-all font-medium"
                />
                <EyeOff
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer"
                  size={18}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#f1f4f4] border-none rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-[#00e5ff] outline-none transition-all font-medium"
              />
            </div>

            {/* Password Requirements */}
            <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
              <Requirement text="At least 8 characters" met />
              <Requirement text="Include a special character" met={false} />
            </div>

            <button className="w-full bg-[#004d4d] text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-900/10 hover:brightness-110 active:scale-[0.98] transition-all">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
