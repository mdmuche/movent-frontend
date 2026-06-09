import {
  User,
  Bell,
  Trash2,
  Globe,
  Database,
  Info,
  LogOut,
  Camera,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  closeAccount,
  updateLanguage,
  updateNotifications,
  updateProfile,
  updateProfilePicture,
} from "../../store/thunks/userThunks";
import Navbar from "../../components/common/Navigation/Navbar";
import Footer from "../../components/common/Footer";
import SettingsTab from "../../components/SettingsTab";
import ToggleRow from "../../components/ToggleRow";
import Stat from "../../components/Stat";
import { clearUserState, setProfileDraft } from "../../store/slices/userSlice";
import InputField from "../../components/InputField";
import { logoutUser } from "../../store/thunks/authThunks";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [showCloseAccountWarning, setShowCloseAccountWarning] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const {
    profile,
    profileDraft = {},
    loading,
    actionLoading,
  } = useSelector((state) => state.user);

  // Initialize profile draft when profile data is loaded
  const handleDraftChange = (e) => {
    dispatch(
      setProfileDraft({
        [e.target.name]: e.target.value,
      }),
    );
  };

  // Handle profile save
  const handleSave = async () => {
    try {
      const res = await dispatch(updateProfile(profileDraft)).unwrap();

      if (res.message === "Profile updated successfully") {
        toast.success(res.message);
      } else {
        toast.info(res.message);
      }
    } catch (err) {
      toast.error(err || "Failed to update profile");
    }
  };
  // Handle profile picture change
  const handlePickImage = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await dispatch(updateProfilePicture(file)).unwrap();
      toast.success("Profile picture updated");
    } catch (err) {
      toast.error(err || "Failed to update profile picture");
    }
  };
  // Handle notification toggle changes
  const notificationPrefs = profile?.notificationPreferences || {};
  const handleToggle = async (field, value) => {
    try {
      await dispatch(
        updateNotifications({
          ...notificationPrefs,
          [field]: value,
        }),
      ).unwrap();
    } catch (err) {
      toast.error(err || "Failed to update preferences");
    }
  };

  const handleLanguageChange = async (e) => {
    const language = e.target.value;

    try {
      await dispatch(updateLanguage({ language })).unwrap();
    } catch (err) {
      toast.error(err || "Failed to update language");
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearUserState());

      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err || "Failed to logout");
    }
  };

  const handleCloseAccount = async () => {
    try {
      await dispatch(closeAccount()).unwrap();

      dispatch(clearUserState());

      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err || "Failed to close account");
    }
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-[#004d4d] font-black text-lg animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR: NAVIGATION */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4 w-24 h-24 group">
                  <img
                    src={
                      profile?.user?.profilePicture ||
                      "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                    }
                    alt={profile?.user?.fullName || "User Avatar"}
                    className="w-24 h-24 rounded-3xl"
                  />

                  <button
                    onClick={handlePickImage}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      bg-black/50 p-3 rounded-xl text-white backdrop-blur-sm
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Camera size={18} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <h2 className="text-xl font-black text-[#004d4d]">
                  {profile?.user?.fullName}
                </h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Premium Curator
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 mb-8">
                <Stat
                  label="Tickets"
                  value={profile?.stats?.ticketsPurchased}
                />
                <Stat label="Events" value={profile?.stats?.eventsCreated} />
                <Stat label="Saved" value={profile?.stats?.savedEventsCount} />
              </div>
              <nav className="space-y-2">
                <SettingsTab
                  icon={<User size={18} />}
                  label="Edit Profile"
                  active
                />
                <SettingsTab icon={<Bell size={18} />} label="Notifications" />
                <SettingsTab icon={<Globe size={18} />} label="Language" />
                <SettingsTab
                  icon={<Database size={18} />}
                  label="Offline Data"
                />
                <SettingsTab icon={<Info size={18} />} label="About Movent" />
                <div className="pt-4 mt-4 border-t border-slate-50">
                  <SettingsTab
                    icon={<LogOut size={18} />}
                    label="Logout"
                    variant="danger"
                    onClick={handleLogout}
                  />
                </div>
              </nav>
            </div>

            {/* Close Account Card */}
            <div className="bg-red-50 rounded-[2rem] p-6 border border-red-100">
              <h4 className="text-red-900 font-black text-sm mb-2 flex items-center gap-2">
                <Trash2 size={16} /> Danger Zone
              </h4>

              {!showCloseAccountWarning ? (
                <button
                  onClick={() => setShowCloseAccountWarning(true)}
                  className="text-red-700 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:underline"
                >
                  Close Account
                </button>
              ) : (
                <>
                  <p className="text-[10px] text-red-700 font-medium mb-4 leading-relaxed">
                    Your account will be deactivated and placed in a 6-month
                    grace period. You can reactivate it at any time by signing
                    in again. If no login activity is detected within 6 months,
                    your account and associated data will be permanently deleted
                    and cannot be recovered.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCloseAccountWarning(false)}
                      className="text-[10px] font-black uppercase tracking-widest text-slate-600 cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleCloseAccount}
                      className="text-[10px] font-black uppercase tracking-widest text-red-700 cursor-pointer hover:underline"
                    >
                      Confirm Close Account
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* RIGHT CONTENT: EDIT PROFILE & PREFERENCES */}
          <main className="lg:col-span-8 space-y-8">
            {/* Section: Personal Information */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-[#004d4d] mb-8">
                Edit Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  type="text"
                  label="Full Name"
                  placeholder="Enter full name"
                  name="fullName"
                  value={profileDraft.fullName || ""}
                  onChange={handleDraftChange}
                />

                <InputField
                  type="email"
                  label="Email"
                  placeholder="Enter email"
                  name="email"
                  value={profileDraft.email || ""}
                  onChange={handleDraftChange}
                />

                <InputField
                  label="Bio"
                  name="bio"
                  as="textarea"
                  rows={5}
                  value={profileDraft.bio || ""}
                  onChange={(e) =>
                    dispatch(setProfileDraft({ bio: e.target.value }))
                  }
                />
              </div>
              <button
                onClick={handleSave}
                disabled={actionLoading}
                className="mt-8 bg-[#00e5ff] text-[#004d4d] font-black px-8 py-4 rounded-2xl shadow-lg disabled:opacity-50"
              >
                {actionLoading ? "Saving..." : "Save Changes"}
              </button>
            </section>

            {/* Section: Preferences */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-[#004d4d] mb-8">
                Notification Preferences
              </h3>
              <div className="space-y-6">
                <ToggleRow
                  label="Event Updates"
                  sub="Receive alerts for changes in your booked events."
                  active={notificationPrefs.eventUpdates ?? false}
                  onToggle={(value) => handleToggle("eventUpdates", value)}
                />

                <ToggleRow
                  label="Promotional Offers"
                  sub="Get notified about exclusive ticket drops."
                  active={notificationPrefs.promotionalOffers ?? false}
                  onToggle={(value) => handleToggle("promotionalOffers", value)}
                />

                <ToggleRow
                  label="Security Alerts"
                  sub="Important notices regarding your account access."
                  active={notificationPrefs.securityAlerts ?? false}
                  onToggle={(value) => handleToggle("securityAlerts", value)}
                />
              </div>
            </section>

            {/* Section: Language & Data */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                <h4 className="font-black text-[#004d4d] mb-4 flex items-center gap-2">
                  <Globe size={18} /> Language
                </h4>
                <select
                  value={profile?.language || "en"}
                  onChange={handleLanguageChange}
                  disabled={actionLoading}
                  className="w-full bg-[#f1f4f4] rounded-xl p-4 text-sm font-bold border-none outline-none"
                >
                  <option>en</option>
                  <option>es</option>
                  <option>pt</option>
                  <option>yo</option>
                  <option>ig</option>
                  <option>ha</option>
                  <option>fr</option>
                  <option>de</option>
                  <option>zh</option>
                  <option>ar</option>
                </select>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                <h4 className="font-black text-[#004d4d] mb-4 flex items-center gap-2">
                  <Database size={18} /> Offline Data
                </h4>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Cache: 24.5 MB
                  </p>
                  <button className="text-[10px] font-black text-[#00e5ff] uppercase tracking-widest hover:underline">
                    Clear Cache
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
