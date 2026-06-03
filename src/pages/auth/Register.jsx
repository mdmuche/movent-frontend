import { ArrowRight, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

// Components
import SocialBtn from "../../components/SocialBtn";
import InputField from "../../components/InputField";
import { registerUser } from "../../store/thunks/authThunks";
// Redux

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName) {
      toast.error("Full name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 3100);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row font-sans">
      {/* Left Pane - Visual Branding */}
      <div className="lg:flex w-full lg:w-5/12 bg-[#004d4d] p-16 flex-col justify-between relative overflow-hidden">
        <Link to="/" className="text-2xl font-black text-[#00e5ff] italic z-10">
          Movent
        </Link>

        <div className="z-10 space-y-6">
          <h2 className="text-6xl font-black text-white leading-none tracking-tighter">
            Join the <br /> Curator Hub
          </h2>
          <p className="text-emerald-100/60 max-w-sm font-medium leading-relaxed">
            Access a curated world of premium events. Connect with high-end
            experiences and secure your place at the most sought-after
            exhibitions.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <Users
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-[#004d4d] bg-slate-200"
                />
              ))}
            </div>
            <span className="text-xs font-black text-emerald-100 uppercase tracking-widest">
              Join 2,400+ curators today
            </span>
          </div>
        </div>

        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] z-10">
          © 2026 Movent Ticketing.
        </p>

        {/* Abstract shapes for background */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-3xl" />
      </div>

      {/* Right Pane - Form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-8 md:p-20">
        <div className="w-full max-w-md space-y-10">
          <header>
            <h2 className="text-4xl font-black text-slate-900 mb-2">
              Create your account
            </h2>
            <p className="text-slate-400 font-bold italic">
              Begin your journey into architectural event experiences.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              placeholder="Alexander Curator"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <InputField
              label="Email Address"
              placeholder="alex@movent.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" className="mt-1 accent-[#00e5ff]" />
              <p className="text-[10px] font-bold text-slate-400 leading-tight">
                I agree to the{" "}
                <span className="text-[#004d4d] underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-[#004d4d] underline cursor-pointer">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            <button className="w-full bg-[#00e5ff] text-[#004d4d] font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-100 hover:scale-[1.01] transition-transform cursor-pointer">
              Create Account <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase text-slate-300 tracking-widest">
              <span className="bg-white px-4 italic">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialBtn label="Google" />
            <SocialBtn label="Facebook" />
          </div>

          <p className="text-center text-sm font-bold text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#004d4d] font-black cursor-pointer hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
