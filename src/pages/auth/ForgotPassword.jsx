import { useState } from "react";
import { ArrowLeft, Mail, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { forgotPassword } from "../../store/thunks/authThunks";
import InputField from "../../components/InputField";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await dispatch(forgotPassword(email)).unwrap();

      toast.success(res?.message || "Reset link sent to your email");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
          <Link
            to="/login"
            className="flex items-center gap-2 text-[#004d4d] font-black text-[10px] uppercase tracking-widest mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} /> Back to Login
          </Link>

          <header className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-3">
              Forgot Password?
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Enter your email address and we'll send you a link to reset your
              access.
            </p>
          </header>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              icon={<Mail size={18} className="text-slate-300" />}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00e5ff] text-[#004d4d] font-black py-5 rounded-2xl shadow-lg shadow-cyan-100 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
