import { useState } from "react";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Requirement from "../../components/Requirement";
import InputField from "../../components/InputField";
import { resetPassword } from "../../store/thunks/authThunks";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await dispatch(
        resetPassword({
          resetToken: token,
          password: formData.password,
        }),
      ).unwrap();

      toast.success(res?.message || "Password updated successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

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
              Choose a strong new password for your account.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* NEW PASSWORD */}
            <InputField
              label="New Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={
                showPassword ? (
                  <EyeOff
                    size={18}
                    className="text-slate-400 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-slate-400 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )
              }
            />

            {/* CONFIRM PASSWORD */}
            <InputField
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />

            {/* REQUIREMENTS */}
            <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
              <Requirement
                text="At least 8 characters"
                met={formData.password.length >= 8}
              />
              <Requirement
                text="Passwords match"
                met={
                  formData.confirmPassword &&
                  formData.password === formData.confirmPassword
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004d4d] text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-900/10 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
