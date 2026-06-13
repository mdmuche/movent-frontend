import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(""); // ✅ FIX: no default value

  const navigate = useNavigate();

  const handleSearch = () => {
    const cleanSearch = search.trim();
    const cleanCity = city.trim();

    // ✅ block navigation if nothing is entered
    if (!cleanSearch && !cleanCity) return;

    const params = new URLSearchParams();

    if (cleanSearch) {
      params.append("search", cleanSearch);
    }

    if (cleanCity) {
      params.append("city", cleanCity);
    }

    navigate(`/events?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center px-4 sm:px-8 lg:px-20 py-12 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-container.svg"
          className="w-full h-full object-contain object-center"
          alt="Live Event Background"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/40 border border-teal-500/30 text-teal-400 text-[10px] md:text-xs font-bold mb-6 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          Curating Live Moments
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-10 md:mb-16 max-w-4xl tracking-tight">
          Discover and curate <br className="hidden sm:block" />
          unforgettable live <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            experiences.
          </span>
        </h2>

        {/* SEARCH BOX */}
        <div className="bg-white rounded-2xl lg:rounded-full shadow-2xl p-2 md:p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0 max-w-5xl">
          {/* SEARCH INPUT */}
          <div className="flex items-center gap-4 px-5 py-3 lg:flex-1 border-b lg:border-b-0 lg:border-r border-gray-100">
            <span className="text-xl">🔍</span>
            <div className="flex flex-col flex-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Search
              </label>
              <input
                type="text"
                placeholder="Events, artists, venues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="outline-none text-sm md:text-base text-slate-800 placeholder:text-gray-300 w-full"
              />
            </div>
          </div>

          {/* LOCATION INPUT */}
          <div className="flex items-center gap-4 px-5 py-3 lg:flex-1 border-b lg:border-b-0 lg:border-r border-gray-100">
            <span className="text-xl">📍</span>
            <div className="flex flex-col flex-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Location
              </label>
              <input
                type="text"
                placeholder="Lagos, Nigeria"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                className="outline-none text-sm md:text-base font-semibold text-slate-700 w-full"
              />
            </div>
          </div>

          {/* DATE (static for now) */}
          <div className="flex items-center gap-4 px-5 py-3 lg:flex-1">
            <span className="text-xl">📅</span>
            <div className="flex flex-col flex-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Date
              </label>
              <input
                type="text"
                value="Any date"
                readOnly
                className="outline-none text-sm md:text-base font-semibold text-slate-700 w-full opacity-60"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSearch}
            className="bg-cyan-400 hover:bg-cyan-500 active:scale-95 transition-all text-white font-bold text-lg py-4 px-10 rounded-xl lg:rounded-full"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
