import {
  Music,
  Palette,
  Trophy,
  Calendar,
  Clock,
  Image as ImageIcon,
  ChevronRight,
  Lightbulb,
  Users,
} from "lucide-react";
import Navbar from "../components/common/Navigation/Navbar";
import Footer from "../components/common/Footer";
import CategoryBtn from "../components/CategoryBtn";
import StepItem from "../components/StepItem";

const CreateEvent = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pb-20 font-sans text-slate-900">
        {/* 1. Header Section */}
        <header className="max-w-7xl mx-auto px-4 pt-12 pb-8 text-center">
          <h1 className="text-xl md:text-4xl font-black text-[#004d4d] font-['Syne'] mb-4 uppercase tracking-tight">
            Create Your Masterpiece
          </h1>
          <p className="text-slate-500 font-bold text-sm md:text-base max-w-2xl mx-auto">
            Transform your vision into a reality. Provide the essential details
            below to start curating your event experience.
          </p>
        </header>

        {/* 2. Stepper Component */}
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="relative flex justify-between items-center">
            {/* Connecting Line */}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 -z-10" />

            <StepItem number={1} label="Basics" active />
            <StepItem number={2} label="Media" />
            <StepItem number={3} label="Location" />
            <StepItem number={4} label="Pricing" />
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-2 space-y-12">
            {/* Event Identity */}
            <section className="space-y-4">
              <h3 className="text-sm font-black text-[#004d4d] uppercase tracking-[0.2em]">
                Event Identity
              </h3>
              <input
                type="text"
                placeholder="e.g. Midnight Jazz at The Glasshouse"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#00e5ff] rounded-2xl p-5 text-slate-900 font-bold placeholder:text-slate-300 outline-none transition-all"
              />
              <p className="text-[10px] font-bold text-slate-400 ml-2">
                Give your event a name that captures the imagination.
              </p>
            </section>

            {/* Curation Category */}
            <section className="space-y-4">
              <h3 className="text-sm font-black text-[#004d4d] uppercase tracking-[0.2em]">
                Curation Category
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <CategoryBtn icon={<Music size={28} />} label="Music" active />
                <CategoryBtn icon={<Palette size={28} />} label="Art" />
                <CategoryBtn icon={<Trophy size={28} />} label="Sports" />
              </div>
            </section>

            {/* Temporal Details */}
            <section className="space-y-4">
              <h3 className="text-sm font-black text-[#004d4d] uppercase tracking-[0.2em]">
                Temporal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-full bg-slate-50 rounded-2xl p-5 pl-14 font-bold outline-none border-2 border-transparent focus:border-[#00e5ff]"
                  />
                </div>
                <div className="relative">
                  <Clock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="--:-- --"
                    className="w-full bg-slate-50 rounded-2xl p-5 pl-14 font-bold outline-none border-2 border-transparent focus:border-[#00e5ff]"
                  />
                </div>
              </div>
            </section>

            {/* Narrative */}
            <section className="space-y-4">
              <h3 className="text-sm font-black text-[#004d4d] uppercase tracking-[0.2em]">
                Narrative
              </h3>
              <textarea
                rows={5}
                placeholder="Describe the atmosphere, the talent, and what guests can expect..."
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#00e5ff] rounded-3xl p-6 text-slate-900 font-bold placeholder:text-slate-300 outline-none transition-all resize-none"
              />
            </section>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="space-y-8">
            {/* Media Upload */}
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00e5ff]">
                <ImageIcon size={32} />
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm mb-1">
                  Upload Cover Image
                </p>
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">
                  Recommended: 1920x1080px (Max 5MB)
                </p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#004d4d] transition-all">
                Preview Area
              </button>
            </div>

            {/* Social Proof Indicator */}
            <div className="flex items-center justify-center gap-3 py-4 bg-cyan-50/50 rounded-2xl border border-cyan-100/50">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-[#004d4d] border-2 border-white flex items-center justify-center"
                  >
                    <Users size={10} className="text-white" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-[#004d4d] uppercase tracking-widest">
                12 Others Creating Now
              </span>
            </div>

            {/* Pro Tip Box */}
            <div className="bg-[#004d4d] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
              <Lightbulb className="text-[#00e5ff] mb-4" size={32} />
              <h4 className="text-lg font-black mb-3">
                Pro Tip: Captivating Titles
              </h4>
              <p className="text-xs font-medium text-emerald-50/80 leading-relaxed">
                Events with clear, evocative names see 40% higher engagement.
                Focus on the vibe rather than just the facts.
              </p>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            </div>
          </div>
        </main>

        {/* 3. Footer Actions */}
        <footer className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <button className="text-[#004d4d] font-black uppercase tracking-widest text-sm hover:translate-x-[-4px] transition-all">
            Save Draft
          </button>
          <button className="w-full md:w-auto bg-[#00e5ff] text-[#004d4d] px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:brightness-105 transition-all shadow-lg shadow-cyan-400/20 active:scale-95">
            Next: Media <ChevronRight size={20} />
          </button>
        </footer>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;
