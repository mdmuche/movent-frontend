function HeroSection() {
  return (
    <section class="relative min-h-[80vh] md:min-h-screen flex items-center px-4 sm:px-8 lg:px-20 py-12 md:py-20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="/images/hero-container.svg"
          class="w-full h-full object-contain object-center"
          alt="Live Event Background"
        />
        <div class="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div class="relative z-10 w-full max-w-6xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/40 border border-teal-500/30 text-teal-400 text-[10px] md:text-xs font-bold mb-6 uppercase tracking-[0.2em]">
          <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          Curating Live Moments
        </div>

        <h2 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-10 md:mb-16 max-w-4xl tracking-tight">
          Discover and curate <br class="hidden sm:block" />
          unforgettable live <br class="hidden sm:block" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            experiences.
          </span>
        </h2>

        <div class="bg-white rounded-2xl lg:rounded-full shadow-2xl p-2 md:p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0 max-w-5xl">
          <div class="flex items-center gap-4 px-5 py-3 lg:flex-1 border-b lg:border-b-0 lg:border-r border-gray-100">
            <span class="text-xl">🔍</span>
            <div class="flex flex-col flex-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Search
              </label>
              <input
                type="text"
                placeholder="Events, artists, venues..."
                class="outline-none text-sm md:text-base text-slate-800 placeholder:text-gray-300 w-full"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 px-5 py-3 lg:flex-1 border-b lg:border-b-0 lg:border-r border-gray-100">
            <span class="text-xl">📍</span>
            <div class="flex flex-col flex-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Location
              </label>
              <input
                type="text"
                value="Lagos, Nigeria"
                class="outline-none text-sm md:text-base font-semibold text-slate-700 w-full"
              />
            </div>
          </div>

          <div class="flex items-center gap-4 px-5 py-3 lg:flex-1">
            <span class="text-xl">📅</span>
            <div class="flex flex-col flex-1">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Date
              </label>
              <input
                type="text"
                value="Any date"
                class="outline-none text-sm md:text-base font-semibold text-slate-700 w-full"
              />
            </div>
          </div>

          <button class="bg-cyan-400 hover:bg-cyan-500 hover:scale-[1.02] active:scale-95 text-white font-bold text-lg py-4 lg:py-5 px-10 rounded-xl md:rounded-2xl lg:rounded-full transition-all duration-200 shadow-lg shadow-cyan-500/30">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
