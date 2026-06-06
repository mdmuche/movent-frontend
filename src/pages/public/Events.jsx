import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../../components/common/Navigation/Navbar";
import Footer from "../../components/common/Footer";

import { fetchEvents } from "../../store/thunks/eventThunks";

function Events() {
  const dispatch = useDispatch();

  const { events, loading, error } = useSelector((state) => state.events);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(
      fetchEvents({
        search,
        category,
      }),
    );
  }, [dispatch, search, category]);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-white">
        {/* HERO */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-black text-[#004d4d]">
            Discover Events
          </h1>

          <p className="mt-3 text-slate-500">
            Find concerts, tech meetups, comedy shows, business conferences and
            more.
          </p>

          {/* FILTERS */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl p-4 outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl p-4 outline-none"
            >
              <option value="">All Categories</option>
              <option value="music">Music</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="education">Education</option>
              <option value="fashion">Fashion</option>
              <option value="comedy">Comedy</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {loading && <div className="text-center py-20">Loading events...</div>}

        {/* ERROR */}
        {error && <div className="text-center py-20 text-red-500">{error}</div>}

        {/* EVENTS */}
        {!loading && (
          <div className="max-w-7xl mx-auto px-4 pb-20">
            {events?.length === 0 ? (
              <div className="text-center text-slate-500">No events found.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events?.map((event) => (
                  <Link
                    key={event._id}
                    to={`/events/${event.slug}`}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
                  >
                    <img
                      src={event.bannerImage?.secure_url}
                      alt={event.title}
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-5">
                      <span className="inline-block text-xs font-bold uppercase bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full">
                        {event.category}
                      </span>

                      <h2 className="mt-3 text-xl font-black text-slate-900">
                        {event.title}
                      </h2>

                      <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mt-4 space-y-2 text-sm text-slate-600">
                        <p>
                          📍 {event.venue}, {event.city}
                        </p>

                        <p>
                          📅 {new Date(event.startDate).toLocaleDateString()}
                        </p>

                        <p>
                          🎟️{" "}
                          {event.isFree
                            ? "Free"
                            : `₦${event.ticketPrice?.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Events;
