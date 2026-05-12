import { Link } from "react-router-dom";

function Login() {
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
            Secure Access
          </span>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#004d4d] to-[#00e5ff]" />

        <div className="p-8 md:p-12">
          <header className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Login</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Welcome back to the architectural pulse of events.
            </p>
          </header>

          <form className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-[#f1f4f4] border-none rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-[#00e5ff] outline-none transition-all font-medium"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-black text-[#00e5ff] uppercase tracking-wider hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#f1f4f4] border-none rounded-2xl p-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-[#00e5ff] outline-none transition-all font-medium"
                />
              </div>
            </div>

            {/* Login Button */}
            <button className="w-full bg-[#00e5ff] text-[#004d4d] font-black py-5 rounded-2xl shadow-lg shadow-cyan-200 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs font-black uppercase tracking-[0.2em] text-slate-300">
              <span className="bg-white px-4 italic">Or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-[#f1f4f4] hover:bg-slate-200 p-4 rounded-xl transition-colors group">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                Google
              </span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-[#f1f4f4] hover:bg-slate-200 p-4 rounded-xl transition-colors group">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                Apple
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Create Account Link */}
      <p className="mt-8 text-sm font-bold text-slate-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-[#004d4d] hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default Login;
