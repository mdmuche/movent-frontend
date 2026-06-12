import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/common/Navigation/AdminNavbar";

import { getAuditLogs } from "../../store/thunks/adminThunks";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

function AuditLogs() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { auditLogs, auditPagination, auditLoading } = useSelector(
    (state) => state.admin,
  );

  // -----------------------------
  // FETCH LOGS
  // -----------------------------
  useEffect(() => {
    dispatch(getAuditLogs({ page, limit: 20 }));
  }, [dispatch, page]);
  const totalPages = auditPagination?.total || 1;

  const canNext = page < totalPages;
  const canPrev = page > 1;

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-900">
      <AdminSidebar />

      <main className="flex-1 overflow-x-hidden">
        <AdminNavbar />

        <div className="h-16 sm:h-28 lg:h-32 xl:h-20" />

        <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
          {/* HEADER */}
          <div>
            <h2 className="text-3xl font-black">Audit Logs</h2>
            <p className="text-slate-500 text-sm">
              Track all system and admin actions in real time.
            </p>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left p-4">Action</th>
                  <th className="text-left p-4">Admin</th>
                  <th className="text-left p-4">Target</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {/* LOADING STATE */}
                {auditLoading ? (
                  <tr>
                    <td className="p-6 text-slate-500" colSpan="4">
                      Loading audit logs...
                    </td>
                  </tr>
                ) : auditLogs?.length === 0 ? (
                  <tr>
                    <td className="p-6 text-slate-500" colSpan="4">
                      No audit logs found
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr
                      key={log._id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-4 font-bold text-slate-900">
                        {log.action}
                      </td>

                      <td className="p-4">
                        <div className="font-semibold">
                          {log.performedBy?.fullName || "System"}
                        </div>
                        <div className="text-xs text-slate-400">
                          {log.performedBy?.email}
                        </div>
                      </td>

                      <td className="p-4 text-slate-500">{log.targetType}</td>

                      <td className="p-4 text-slate-500">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <button
                disabled={!canPrev}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 bg-[#004d4d] text-white border rounded-xl disabled:opacity-40"
              >
                <CircleArrowLeft size={20} />
              </button>

              <p className="text-sm text-slate-500">
                Page {page} of {totalPages}
              </p>

              <button
                disabled={!canNext}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 bg-[#004d4d] text-white border rounded-xl disabled:opacity-40"
              >
                <CircleArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AuditLogs;
