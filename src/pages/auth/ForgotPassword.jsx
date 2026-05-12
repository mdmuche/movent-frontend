import { ArrowLeft, Mail, ChevronRight } from "lucide-react";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-[#004d4d] italic tracking-tight mb-2">
          Movent
        </h1>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#004d4d] rounded-full" />
          <span className="text-[10px] font-black text-[#004d4d] uppercase tracking-[0.2em]">
            Security Portal
          </span>
        </div>
      </div>

      <div className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#004d4d] to-[#00e5ff]" />

        <div className="p-8 md:p-12">
          <button className="flex items-center gap-2 text-[#004d4d] font-black text-[10px] uppercase tracking-widest mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={14} /> Back to Login
          </button>

          <header className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-3">
              Forgot Password?
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Enter your email address and we'll send you a link to reset your
              access.
            </p>
          </header>

          <form className="space-y-8">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-[#f1f4f4] border-none rounded-2xl p-4 pl-12 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-[#00e5ff] outline-none transition-all font-medium"
                />
              </div>
            </div>

            <button className="w-full bg-[#00e5ff] text-[#004d4d] font-black py-5 rounded-2xl shadow-lg shadow-cyan-100 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Send Reset Link <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
