import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/common/Navigation/Navbar";
import Footer from "../../components/common/Footer";

import {
  deleteEvent,
  fetchOrganizerDashboard,
} from "../../store/thunks/organizerThunks";
import SideBar from "../../components/SideBar";

function OrganizerEvents() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { organizerDashboard, loading } = useSelector(
    (state) => state.organizer,
  );

  const events = organizerDashboard?.myEvents || [];

  const totalPages = organizerDashboard?.pagination?.totalPages || 0;

  useEffect(() => {
    dispatch(
      fetchOrganizerDashboard({
        page,
        limit: 10,
      }),
    );
  }, [dispatch, page]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
        {/* Sidebar - Hidden on mobile, fixed on desktop */}
        <SideBar />
        <div className="flex-1 p-4 md:p-8 space-y-10">
          {/* HERO */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-12 pb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-50 text-cyan-600 text-xs font-black uppercase tracking-wider">
              My Events
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-black text-slate-900 font-['Syne']">
              Manage Your Events
            </h1>

            <p className="mt-4 text-slate-500 max-w-2xl">
              View, edit, and delete your created events.
            </p>
          </section>

          {/* CONTENT */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-20">
            {/* LOADING */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-28 bg-white rounded-3xl animate-pulse"
                  />
                ))}
              </div>
            ) : events.length ? (
              <>
                {/* LIST */}
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="bg-white rounded-3xl p-5 border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      {/* LEFT */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        <img
                          src={event.bannerImage?.secure_url}
                          alt={event.title}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />

                        <div className="text-left">
                          <h2 className="font-black text-lg text-slate-900">
                            {event.title}
                          </h2>

                          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                            <Calendar size={14} />
                            {new Date(event.startDate).toLocaleDateString()}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin size={14} />
                            {event.venue}
                          </div>

                          <p className="text-xs mt-2">
                            Status:{" "}
                            <span className="font-bold">
                              {event.approvalStatus}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Link
                          to={`/events/${event.slug}`}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-center"
                        >
                          View
                        </Link>

                        <Link
                          to={`/update/${event._id}`}
                          className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm text-center"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(event._id)}
                          className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm text-center"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-3 mt-16 flex-wrap">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => {
                            setPage(pageNumber);
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                            page === pageNumber
                              ? "bg-cyan-400 text-white shadow-lg"
                              : "bg-white border border-slate-200 text-slate-600"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center">
                <h3 className="text-xl font-black">No events found</h3>
                <p className="text-slate-500 mt-2">
                  Create your first event to get started.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrganizerEvents;
