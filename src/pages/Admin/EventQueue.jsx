import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/common/Navigation/AdminNavbar";
import EventRow from "../../components/EventRow";

import { getEventQueue } from "../../store/thunks/adminThunks";

function EventQueue() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { eventQueue, pagination, loading } = useSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    dispatch(
      getEventQueue({
        page,
        limit: 10,
      }),
    );
  }, [dispatch, page]);

  if (loading && !eventQueue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-bold">Loading Events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-900">
      <AdminSidebar />

      <main className="flex-1 overflow-x-hidden">
        <AdminNavbar />
        <div className="h-16 sm:h-28 lg:h-32 xl:h-20" />

        <div className="p-4 lg:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">Event Queue</h2>

            <p className="text-slate-500">Review pending event submissions.</p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-4">Event Name</th>
                  <th className="pb-4">Organizer</th>
                  <th className="pb-4">Date Requested</th>
                  <th className="pb-4">Capacity</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {eventQueue.map((event) => (
                  <EventRow
                    key={event._id}
                    name={event.title}
                    sub={event.category}
                    org={event.organizer?.fullName}
                    date={new Date(event.createdAt).toLocaleDateString()}
                    cap={event.totalTickets}
                    image={event.bannerImage?.secure_url}
                  />
                ))}
              </tbody>
            </table>

            {pagination?.totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <button
                  disabled={!pagination?.hasPrevPage}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="font-bold text-sm">
                  Page {pagination?.currentPage} of {pagination?.totalPages}
                </span>

                <button
                  disabled={!pagination?.hasNextPage}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventQueue;
