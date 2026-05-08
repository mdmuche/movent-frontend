import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="px-4 sm:px-8 lg:px-20 py-20 bg-white">
      {/* Container with Teal Gradient */}
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#004d4d] to-[#002b2b] rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-400/10 blur-[100px] pointer-events-none" />

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/10">
          <Mail className="text-cyan-400" size={32} />
        </div>

        {/* Text Content */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 font-['Syne'] tracking-tight">
          Access the Unique.
        </h2>
        <p className="text-cyan-100/70 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Join our inner circle for exclusive early access to the most
          prestigious architectural events and underground showcases.
        </p>

        {/* Form Area */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto"
        >
          <div className="relative flex-grow">
            <input
              type="email"
              placeholder="Your architectural muse email..."
              className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/30 outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-400 hover:bg-cyan-500 text-[#002b2b] font-black py-4 px-10 rounded-xl transition-all active:scale-95 shadow-lg shadow-cyan-400/20 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mt-8">
          Zero Spam. Pure Inspiration. Weekly Curated Digests.
        </p>
      </div>
    </section>
  );
}

export default Newsletter;
