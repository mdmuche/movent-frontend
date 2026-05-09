import { Calendar, Clock, MapPin, Share2, Heart } from "lucide-react";
import Navbar from "../components/common/Navigation/Navbar";
import Footer from "../components/common/Footer";
import { events } from "../data/moventData";
import { useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      {events
        .filter((event) => event.id === parseInt(id))
        .map((event) => (
          <div className="min-h-screen bg-white pb-20">
            {/* Hero Section Container */}
            <div className="max-w-7xl mx-auto px-4 pt-6">
              <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden group">
                {/* Main Event Image */}
                <img
                  src={event.image}
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
                      {event.date.month} {event.date.day}, {event.date.year}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Clock size={18} className="text-cyan-400" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <MapPin size={18} className="text-cyan-400" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Booking Bar (Floating for Lagos Users) */}
            <div className="max-w-7xl mx-auto px-4 mt-8">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Starting from
                  </p>
                  <p className="text-3xl font-black text-slate-900">
                    {event.price.toLocaleString()}
                    <span className="text-sm font-medium text-slate-500">
                      / person
                    </span>
                  </p>
                </div>
                <button className="w-full md:w-auto bg-[#004d4d] text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-[#003636] transition-all shadow-xl shadow-[#004d4d]/20 active:scale-95">
                  Get Your Tickets
                </button>
              </div>
            </div>
          </div>
        ))}
      <Footer />
    </>
  );
}

export default EventDetails;
