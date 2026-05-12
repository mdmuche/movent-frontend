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
import Navbar from "../components/common/Navigation/Navbar";
import Footer from "../components/common/Footer";
import SettingsTab from "../components/SettingsT.ab";
import InputGroup from "../components/InputGroup";
import ToggleRow from "../components/ToggleRow";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR: NAVIGATION */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-[#004d4d] rounded-3xl flex items-center justify-center text-white text-3xl font-black">
                    JD
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-[#00e5ff] p-2 rounded-xl shadow-lg text-[#004d4d]">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="text-xl font-black text-[#004d4d]">
                  Johnathan Doe
                </h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Premium Curator
                </p>
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
                  />
                </div>
              </nav>
            </div>

            {/* Close Account Card */}
            <div className="bg-red-50 rounded-[2rem] p-6 border border-red-100">
              <h4 className="text-red-900 font-black text-sm mb-2 flex items-center gap-2">
                <Trash2 size={16} /> Danger Zone
              </h4>
              <p className="text-[10px] text-red-700 font-medium mb-4 leading-relaxed">
                Once you close your account, all event data and tickets will be
                permanently deleted.
              </p>
              <button className="text-red-700 font-black text-[10px] uppercase tracking-widest hover:underline">
                Close Account
              </button>
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
                <InputGroup label="Full Name" placeholder="Johnathan Doe" />
                <InputGroup
                  label="Email Address"
                  placeholder="john@architecture.com"
                />
                <div className="md:col-span-2">
                  <InputGroup
                    label="Bio / Professional Headline"
                    placeholder="Architectural curator and event strategist."
                  />
                </div>
              </div>
              <button className="mt-8 bg-[#00e5ff] text-[#004d4d] font-black px-8 py-4 rounded-2xl shadow-lg shadow-cyan-100 hover:brightness-105 transition-all">
                Save Changes
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
                  active
                />
                <ToggleRow
                  label="Promotional Offers"
                  sub="Get notified about exclusive ticket drops."
                />
                <ToggleRow
                  label="Security Alerts"
                  sub="Important notices regarding your account access."
                  active
                />
              </div>
            </section>

            {/* Section: Language & Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                <h4 className="font-black text-[#004d4d] mb-4 flex items-center gap-2">
                  <Globe size={18} /> Language
                </h4>
                <select className="w-full bg-[#f1f4f4] rounded-xl p-4 text-sm font-bold border-none outline-none">
                  <option>English (US)</option>
                  <option>French</option>
                  <option>German</option>
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
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
