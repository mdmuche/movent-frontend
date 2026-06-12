import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark, Ticket } from "lucide-react";
import { toast } from "react-toastify";

import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navigation/Navbar";
import SideBar from "../../components/SideBar";

import { fetchMyTickets } from "../../store/thunks/ticketThunks";
import { fetchSavedEvents } from "../../store/thunks/userThunks";
import { cancelTicket } from "../../store/thunks/ticketThunks";

function MyEvents() {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("tickets");
  const [page, setPage] = useState(1);
  const [cancellingReference, setCancellingReference] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");

  const { tickets, pagination, loading } = useSelector((state) => state.ticket);

  const { savedEvents, savedEventsLoading } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (activeTab === "tickets") {
      dispatch(fetchMyTickets({ page, limit: 10 }));
    } else {
      dispatch(fetchSavedEvents({ page, limit: 10 }));
    }
  }, [dispatch, activeTab, page]);

  const isLoading = activeTab === "tickets" ? loading : savedEventsLoading;

  const totalPages =
    activeTab === "tickets"
      ? pagination?.totalPages || 1
      : savedEvents?.pagination?.totalPages || 1;

  /**
   * GROUP TICKETS BY EVENT TITLE + VENUE
   */
  const groupedEvents =
    activeTab === "tickets"
      ? Object.values(
          (tickets || []).reduce((acc, ticket) => {
            const key = `${ticket.event?.title}-${ticket.event?.venue}`;

            if (!acc[key]) {
              acc[key] = {
                event: ticket.event,
                tickets: [],
              };
            }

            acc[key].tickets.push(ticket);
            return acc;
          }, {}),
        )
      : savedEvents?.savedEvents;

  /**
   * FILTER TICKETS INSIDE SELECTED EVENT
   */
  const filteredTickets =
    selectedEvent?.tickets?.filter((t) =>
      `${t.reference} ${t.ticketType} ${t.status}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    ) || [];

  /**
   *CANCEL TICKET WITH PROPER CONFIRMATION
   */
  const handleCancelTicket = async (ticketId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this ticket? This may be non-refundable.",
    );

    if (!confirmed) return;

    try {
      setCancellingReference(ticketId);

      await dispatch(cancelTicket(ticketId)).unwrap();

      toast.success("Ticket cancelled successfully");

      dispatch(fetchMyTickets({ page, limit: 10 }));
      setSelectedEvent(null);
    } catch (err) {
      toast.error(err?.message || "Failed to cancel ticket");
    } finally {
      setCancellingReference(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
        <SideBar />

        <main className="flex-1 p-4 md:p-8 space-y-10">
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-black text-slate-900">My Events</h1>
            <p className="text-slate-500 mt-2">
              Manage your tickets and saved events.
            </p>
          </div>

          {/* TOGGLE */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setActiveTab("tickets");
                setPage(1);
                setSelectedEvent(null);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold ${
                activeTab === "tickets"
                  ? "bg-[#004d4d] text-white"
                  : "bg-white border"
              }`}
            >
              <Ticket size={18} />
              Tickets
            </button>

            <button
              onClick={() => {
                setActiveTab("saved");
                setPage(1);
                setSelectedEvent(null);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold ${
                activeTab === "saved"
                  ? "bg-[#004d4d] text-white"
                  : "bg-white border"
              }`}
            >
              <Bookmark size={18} />
              Saved
            </button>
          </div>

          {/* CONTENT */}
          {isLoading ? (
            <p>Loading...</p>
          ) : groupedEvents?.length ? (
            <>
              {/* EVENTS LIST */}
              {!selectedEvent && activeTab === "tickets" && (
                <div className="space-y-4">
                  {groupedEvents.map((group, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl p-5 cursor-pointer hover:shadow"
                      onClick={() => setSelectedEvent(group)}
                    >
                      <h2 className="font-black text-lg">
                        {group.event?.title}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {group.event?.venue}
                      </p>

                      <p className="text-xs text-slate-400 mt-3">
                        {group.tickets.length} ticket(s)
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* SAVED EVENTS */}
              {activeTab === "saved" && (
                <div className="space-y-3">
                  {groupedEvents.map((event) => (
                    <div
                      key={event._id}
                      className="flex items-center justify-between bg-white p-4 rounded-2xl"
                    >
                      <div>
                        <h2 className="font-black text-slate-900">
                          {event.title}
                        </h2>
                        <p className="text-sm text-slate-500">{event.venue}</p>
                      </div>

                      <span className="text-xs text-slate-400">
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* SELECTED EVENT DETAILS */}
              {selectedEvent && (
                <div className="bg-white rounded-3xl p-5 mt-6">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-sm text-[#004d4d] font-bold mb-4"
                  >
                    ← Back
                  </button>

                  <h2 className="font-black text-xl">
                    {selectedEvent.event.title}
                  </h2>

                  <p className="text-slate-500">{selectedEvent.event.venue}</p>

                  {/* SEARCH */}
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by reference, ticket type or status"
                    className="w-full mt-4 border p-3 rounded-xl"
                  />

                  {/* TICKETS LIST */}
                  <div className="mt-4 space-y-3">
                    {filteredTickets.map((t) => (
                      <div key={t._id} className="shadow-md rounded-xl p-3">
                        <p className="font-bold">{t.reference}</p>

                        <div className="flex gap-2 items-center">
                          <span className="inline-block px-3 py-1 text-xs bg-cyan-50 text-cyan-600 rounded-full">
                            {t.ticketType}
                          </span>
                          {t.status === "active" && (
                            <span className="text-xs bg-cyan-50 text-cyan-600 px-2 py-1 rounded-full">
                              active
                            </span>
                          )}

                          {t.status !== "cancelled" && (
                            <button
                              disabled={cancellingReference === t._id}
                              onClick={() => handleCancelTicket(t._id)}
                              className="text-red-500 text-sm mt-2 font-bold disabled:opacity-50"
                            >
                              {cancellingReference === t._id
                                ? "Cancelling..."
                                : "Cancel Ticket"}
                            </button>
                          )}
                          {t.status === "cancelled" && (
                            <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">
                              Cancelled
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAGINATION */}
              {!selectedEvent && totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-xl font-bold ${
                        page === i + 1
                          ? "bg-[#004d4d] text-white"
                          : "bg-white border"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-slate-500">No data found.</p>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default MyEvents;
