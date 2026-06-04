import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Heart,
  CirclePlay,
  CassetteTape,
  Landmark,
} from "lucide-react";
import Navbar from "../../components/common/Navigation/Navbar";
import Footer from "../../components/common/Footer";
import { useNavigate, useParams } from "react-router-dom";
import VenueMap from "../../components/VenueMap";
import { getEvent } from "../../api/eventApi";

const fakeCoords = {
  lagos: { lat: 6.5244, lng: 3.3792 },
  london: { lat: 51.5072, lng: -0.1276 },
  berlin: { lat: 52.52, lng: 13.405 },
  default: { lat: 6.5244, lng: 3.3792 },
};

function EventDetails() {
  const getCoords = () => {
    if (!event) return fakeCoords.default;

    if (event.location?.coordinates) {
      return {
        lat: event.location.coordinates[1],
        lng: event.location.coordinates[0],
      };
    }

    const city = event.city?.toLowerCase();

    return fakeCoords[city] || fakeCoords.default;
  };

  const { slug } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEvent(slug);
        setEvent(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return <div className="p-10 font-bold">Loading event...</div>;
  }

  if (!event) {
    return <div className="p-10 font-bold">Event not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pb-20">
        {/* Hero Section Container */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden group">
            {/* Main Event Image */}
            <img
              src={event.bannerImage.secure_url}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Top Actions (Share/Like) */}
            <div className="absolute top-6 right-6 flex gap-3">
              <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                <Share2 size={20} />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-red-500/80 transition-all">
                <Heart size={20} />
              </button>
            </div>

            {/* Event Info Content */}
            <div className="absolute bottom-10 left-10 right-10">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-[#00e5ff] text-[#004d4d] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-6">
                <span className="w-2 h-2 bg-[#004d4d] rounded-full animate-pulse" />
                Live Status: Tickets Selling Fast
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-['Syne'] leading-tight max-w-3xl">
                {event.title}
              </h1>

              {/* Meta Info Grid */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Calendar size={18} className="text-cyan-400" />
                  {new Date(event.startDate).toDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Clock size={18} className="text-cyan-400" />
                  {event.startTime}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <MapPin size={18} className="text-cyan-400" />
                  {event.venue}, {event.city}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Booking Bar */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Starting from
              </p>
              <p className="text-3xl font-black text-slate-900">
                ₦{event.ticketPrice}
                <span className="text-sm font-medium text-slate-500">
                  / person
                </span>
              </p>
            </div>
            <button
              onClick={() => navigate(`/checkout/${event.slug}`)}
              className="w-full md:w-auto bg-[#004d4d] text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-[#003636] transition-all shadow-xl shadow-[#004d4d]/20 active:scale-95"
            >
              Get Your Tickets
            </button>
          </div>
        </div>
        {/* About Section */}
        <section className="max-w-7xl mx-auto px-4 mt-12">
          <h2 className="text-3xl font-black text-[#004d4d] font-['Syne'] mb-6">
            About this Event
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">{event.description}</p>

          {/* Feature Tags */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {event.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm"
              >
                <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                </div>
                <span className="text-sm font-bold text-slate-700">
                  {feature}
                </span>
              </div>
            ))}
          </div> */}
        </section>
        {/* Venue Section */}
        <section className="max-w-7xl mx-auto px-4 mt-12">
          <h2 className="text-3xl font-black text-[#004d4d] font-['Syne'] mb-6">
            The Venue
          </h2>
          <div className="relative rounded-[2rem] overflow-hidden h-64 md:h-96 border border-slate-200">
            <VenueMap
              eventCoords={getCoords()}
              venueName={event.venue}
              venueAddress={`${event.venue}, ${event.city}`}
            />
            <div className="absolute inset-0 bg-[#004d4d]/10 flex items-center justify-center">
              <div className="bg-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
                <MapPin className="text-[#004d4d]" size={18} />
                <span className="font-bold text-sm">{event.venue}</span>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* left Column: Sticky Ticket Selection */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-black text-[#004d4d] mb-8">
                Select Tickets
              </h3>

              <div className="space-y-6">
                {/* Standard Ticket */}
                <div className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Standard Admission
                      </h4>
                      <p className="text-xs text-gray-500">
                        General access to main stage
                      </p>
                    </div>
                    <span className="text-xl font-black text-slate-900">
                      {event.ticketPrice}
                    </span>
                  </div>
                  <button className="w-full mt-4 py-3 bg-slate-200 text-slate-600 rounded-xl font-bold text-sm group-hover:bg-[#004d4d] group-hover:text-white transition-all">
                    Select Option
                  </button>
                </div>

                {/* VIP Ticket */}
                <div className="p-6 bg-white rounded-3xl border-2 border-cyan-400 relative">
                  <div className="absolute -top-3 right-6 bg-cyan-400 text-[#004d4d] text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    Recommended
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        VIP Experience
                      </h4>
                      <p className="text-xs text-gray-500">
                        Fast track, lounge & 2 drinks
                      </p>
                    </div>
                    <span className="text-xl font-black text-slate-900">
                      ₦{(Number(event.ticketPrice) * 2.5).toLocaleString()}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 mb-6">
                    <li className="text-[11px] font-bold text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />{" "}
                      Exclusive VIP Balcony Access
                    </li>
                    <li className="text-[11px] font-bold text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />{" "}
                      Private Bar & Premium Toilets
                    </li>
                  </ul>
                  <button className="w-full py-4 bg-cyan-400 text-[#004d4d] rounded-xl font-black text-sm hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20">
                    Buy VIP Tickets
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                  Secure checkout powered by Paystack
                </p>
                <div className="flex justify-center gap-4 opacity-30 grayscale">
                  <CirclePlay
                    size={20}
                    className="w-8 h-5 bg-slate-400 rounded"
                  />
                  <CassetteTape
                    size={20}
                    className="w-8 h-5 bg-slate-400 rounded"
                  />
                  <Landmark
                    size={20}
                    className="w-8 h-5 bg-slate-400 rounded"
                  />
                </div>
              </div>
            </div>
          </aside>
          {/* Right Column Things to Know Section */}
          <section className="bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-100 mt-12">
            <h2 className="text-2xl font-black text-[#004d4d] font-['Syne'] mb-8">
              Things to Know
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Entry Requirements */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#004d4d]">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-wider">
                    Entry Requirements
                  </h4>
                </div>
                <ul className="space-y-3">
                  {event.entryRequirements?.map((req, i) => (
                    <li key={i} className="text-gray-600">
                      • {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Refund Policy */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#004d4d]">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-wider">
                    Refund Policy
                  </h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Tickets are non-refundable but can be transferred via the
                  Movent marketplace up to 24 hours before the event starts.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EventDetails;
