import { Search, Home, Map } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-[#004d4d] rounded-full" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Error 404
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-[#004d4d] leading-[0.9] tracking-tighter">
              Event Not <br /> Found
            </h1>
            <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-md">
              The tickets you're looking for have vanished from our records. The
              stage has been cleared, or perhaps the spotlight moved elsewhere.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/"
              className="bg-[#00e5ff] text-[#004d4d] font-black px-8 py-4 rounded-2xl shadow-lg shadow-cyan-100 hover:brightness-105 transition-all flex items-center justify-center gap-2"
            >
              <Home size={18} /> Return Home
            </Link>
            <Link
              to="/"
              className="bg-slate-100 text-slate-600 font-black px-8 py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Map size={18} /> Explore Events
            </Link>
          </div>

          <p className="text-[10px] font-bold text-slate-300 italic pt-8 max-w-xs">
            "In every empty venue, there's a new story waiting to be booked."
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-full aspect-square max-w-md bg-gradient-to-tr from-slate-50 to-cyan-50 rounded-[3rem] flex items-center justify-center overflow-hidden shadow-inner">
            {/* The Ticket Card Illustration */}
            <div className="relative z-10 w-3/4 bg-white rounded-2xl p-6 shadow-2xl border border-slate-50 transform -rotate-6">
              <div className="flex justify-between items-start mb-12">
                <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                <div className="text-right">
                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                    Status
                  </p>
                  <p className="text-[10px] font-black text-red-500 uppercase">
                    Void
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-50 rounded-full" />
                <div className="h-2 w-2/3 bg-slate-50 rounded-full" />
              </div>
              <div className="mt-8 flex justify-end">
                <div className="w-6 h-6 bg-slate-50 rounded-full" />
              </div>
            </div>

            {/* Floating Search Icon */}
            <div className="absolute bottom-12 right-12 bg-[#00e5ff] p-4 rounded-2xl shadow-xl shadow-cyan-200 z-20 animate-bounce">
              <Search className="text-[#004d4d]" size={28} />
            </div>

            {/* Decorative Background Blur */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#00e5ff]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
