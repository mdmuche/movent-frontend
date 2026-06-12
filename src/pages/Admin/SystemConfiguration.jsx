import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/common/Navigation/AdminNavbar";

import {
  getSystemSettings,
  updateSystemSettings,
} from "../../store/thunks/adminThunks"; // or slice export depending on your setup
import { setSettingsDraft } from "../../store/slices/adminSlice";

function SystemConfiguration() {
  const dispatch = useDispatch();

  const {
    systemSettings,
    settingsDraft,
    settingsLoading,
    settingsUpdateLoading,
  } = useSelector((state) => state.admin);

  // -------------------------
  // FETCH SETTINGS ON LOAD
  // -------------------------
  useEffect(() => {
    dispatch(getSystemSettings());
  }, [dispatch]);

  // -------------------------
  // LOADING STATE
  // -------------------------
  if (settingsLoading && !systemSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-bold">Loading settings...</p>
      </div>
    );
  }

  // -------------------------
  // HANDLE CHANGE
  // -------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    dispatch(
      setSettingsDraft({
        [name]: type === "checkbox" ? checked : value,
      }),
    );
  };

  // -------------------------
  // SUBMIT UPDATE
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateSystemSettings(settingsDraft)).unwrap();

      toast.success("System settings updated successfully");
    } catch (err) {
      toast.error(err || "Failed to update system settings");
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-900">
      <AdminSidebar />

      <main className="flex-1 overflow-x-hidden">
        <AdminNavbar />

        <div className="h-16 sm:h-28 lg:h-32 xl:h-20" />

        <div className="p-4 lg:p-8 max-w-3xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">
              System Configuration
            </h2>
            <p className="text-slate-500">
              Manage platform-wide rules and settings.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-6"
          >
            {/* Platform Commission */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Platform Commission (%)
              </label>
              <input
                name="platformCommission"
                type="number"
                value={settingsDraft?.platformCommission || ""}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border rounded-xl bg-slate-50"
              />
            </div>

            {/* Max Tickets */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Max Ticket Per Purchase
              </label>
              <input
                name="maxTicketPerPurchase"
                type="number"
                value={settingsDraft?.maxTicketPerPurchase || ""}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border rounded-xl bg-slate-50"
              />
            </div>

            {/* Support Email */}
            <div>
              <label className="text-sm font-bold text-slate-700">
                Support Email
              </label>
              <input
                name="supportEmail"
                type="email"
                value={settingsDraft?.supportEmail || ""}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border rounded-xl bg-slate-50"
              />
            </div>

            {/* Maintenance Mode */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border">
              <div>
                <p className="font-bold text-slate-800">Maintenance Mode</p>
                <p className="text-xs text-slate-500">
                  Disable platform access for users
                </p>
              </div>

              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settingsDraft?.maintenanceMode || false}
                onChange={handleChange}
                className="w-5 h-5"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={settingsUpdateLoading}
              className="w-full bg-[#00e5ff] text-[#004d4d] font-black py-3 rounded-xl hover:brightness-105 transition-all disabled:opacity-60"
            >
              {settingsUpdateLoading ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SystemConfiguration;
