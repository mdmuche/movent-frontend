import { MapPin, ArrowRight } from "lucide-react";
import { events } from "../data/moventData";

function UpcomingEvents() {
  return (
    <section className="px-4 sm:px-8 lg:px-20 py-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-['Syne']">
            Upcoming Experiences
          </h2>
          <a
            href="#"
            className="flex items-center gap-2 text-[#00c9a0] font-bold text-sm hover:underline"
          >
            View All Events <ArrowRight size={18} />
          </a>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />

                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-[#004d4d] text-white px-3 py-1 rounded-lg text-center leading-tight">
                  <p className="text-[10px] font-bold opacity-70">
                    {event.date.month}
                  </p>
                  <p className="text-lg font-extrabold">{event.date.day}</p>
                </div>

                {/* Optional Selling Fast Tag */}
                {event.tag && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    {event.tag}
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                  <MapPin size={14} className="text-gray-300" />
                  {event.location}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug h-14 line-clamp-2 font-['Syne']">
                  {event.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  Experience an avant-garde fusion of classical orchestration
                  and contemporary electronic...
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Tickets from
                    </p>
                    <p className="text-xl font-black text-[#004d4d]">
                      {event.price}
                    </p>
                  </div>

                  <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-cyan-500/20">
                    {event.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
