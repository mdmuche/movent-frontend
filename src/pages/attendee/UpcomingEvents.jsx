import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/common/Navigation/Navbar";
import Footer from "../../components/common/Footer";
import { fetchUpcomingEvents } from "../../store/thunks/eventThunks";

function UpcomingEvents() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { upcomingEvents, upcomingEventsPagination, upcomingEventsLoading } =
    useSelector((state) => state.events);

  useEffect(() => {
    dispatch(
      fetchUpcomingEvents({
        page,
        limit: 10,
      }),
    );
  }, [dispatch, page]);

  const totalPages = upcomingEventsPagination?.totalPages || 0;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-12 pb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-50 text-cyan-600 text-xs font-black uppercase tracking-wider">
            Upcoming Events
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-black text-slate-900 font-['Syne'] leading-tight">
            Discover What's
            <br />
            Happening Next
          </h1>

          <p className="mt-4 text-slate-500 max-w-2xl">
            Explore upcoming experiences, conferences, concerts, networking
            sessions, workshops and cultural events.
          </p>
        </section>

        {/* Events */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-20">
          {upcomingEventsLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-[2rem] bg-white animate-pulse"
                />
              ))}
            </div>
          ) : upcomingEvents?.length ? (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <Link
                    key={event._id}
                    to={`/event/${event._id}`}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={event.bannerImage?.secure_url}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                      />

                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-700">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-black text-slate-900 mb-4">
                        {event.title}
                      </h2>

                      <div className="flex flex-col gap-3 text-sm text-slate-500 mb-5">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(event.startDate).toLocaleDateString()}
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {event.location}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-cyan-500 font-bold">
                        View Details
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
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
                            : "bg-white border border-slate-200 text-slate-600 hover:border-cyan-400"
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
            <div className="bg-white rounded-[2rem] p-12 text-center">
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                No Upcoming Events
              </h3>

              <p className="text-slate-500">
                Check back later for newly scheduled experiences.
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default UpcomingEvents;
