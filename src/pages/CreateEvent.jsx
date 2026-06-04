import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Calendar,
  Clock,
  Image as ImageIcon,
  ChevronRight,
  Lightbulb,
  Users,
} from "lucide-react";
import Navbar from "../components/common/Navigation/Navbar";
import Footer from "../components/common/Footer";
// import CategoryBtn from "../components/CategoryBtn";
import StepItem from "../components/StepItem";
import InputField from "../components/InputField";
import { createEvent } from "../store/thunks/organizerThunks";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",

    venue: "",
    city: "",
    state: "",
    country: "",

    startDate: "",
    endDate: "",

    startTime: "",
    endTime: "",

    isFree: true,
    ticketPrice: 0,

    totalTickets: 0,

    tags: "",
    entryRequirements: "",

    agreedToRefundPolicy: false,

    bannerImage: null,
  });
  const { loading } = useSelector((state) => state.organizer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    "music",
    "technology",
    "business",
    "sports",
    "education",
    "fashion",
    "comedy",
    "gaming",
    "other",
  ];

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleIsFree = () => {
    setFormData((prev) => ({
      ...prev,
      isFree: !prev.isFree,
      ticketPrice: prev.isFree ? 0 : prev.ticketPrice,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      bannerImage: file,
    }));
  };

  const validator = () => {
    if (!formData.title.trim()) {
      toast.error("Event title is required");
      return false;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return false;
    }

    if (!formData.venue.trim()) {
      toast.error("Venue is required");
      return false;
    }

    if (!formData.city.trim()) {
      toast.error("City is required");
      return false;
    }

    if (!formData.state.trim()) {
      toast.error("State is required");
      return false;
    }

    if (!formData.country.trim()) {
      toast.error("Country is required");
      return false;
    }

    if (!formData.startDate) {
      toast.error("Start date is required");
      return false;
    }

    if (!formData.endDate) {
      toast.error("End date is required");
      return false;
    }

    if (formData.endDate < formData.startDate) {
      toast.error("End date cannot be before start date");
      return false;
    }

    if (!formData.startTime) {
      toast.error("Start time is required");
      return false;
    }

    if (!formData.endTime) {
      toast.error("End time is required");
      return false;
    }

    if (!formData.isFree && Number(formData.ticketPrice) <= 0) {
      toast.error("Ticket price must be greater than 0");
      return false;
    }

    if (Number(formData.totalTickets) <= 0) {
      toast.error("Total tickets must be greater than 0");
      return false;
    }

    if (!formData.bannerImage) {
      toast.error("Please upload a banner image");
      return false;
    }

    if (!formData.agreedToRefundPolicy) {
      toast.error("You must agree to the refund policy");
      return false;
    }

    return true;
  };

  const formatArray = (value) => {
    if (!value?.trim()) return [];

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validator()) return;

    try {
      const payload = new FormData();

      // normal fields
      Object.keys(formData).forEach((key) => {
        if (key === "bannerImage") return;
        if (key === "tags" || key === "entryRequirements") return;

        payload.append(key, formData[key]);
      });

      // formatted arrays
      payload.append("tags", JSON.stringify(formatArray(formData.tags)));
      payload.append(
        "entryRequirements",
        JSON.stringify(formatArray(formData.entryRequirements)),
      );

      // file
      if (formData.bannerImage) {
        payload.append("bannerImage", formData.bannerImage);
      }

      const res = await dispatch(createEvent(payload)).unwrap();

      toast.success(res?.message || "Event created successfully");

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error(err?.message || "Failed to create event");
    }
  };

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
              <InputField
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Midnight Jazz at The Glasshouse"
              />
              <p className="text-[10px] font-bold text-slate-400 ml-2">
                Give your event a name that captures the imagination.
              </p>
              <InputField
                label="Venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="e.g. Eko Convention Center"
              />
            </section>
            {/* Curation Category */}
            <section className="space-y-4">
              <h3 className="text-sm font-black text-[#004d4d] uppercase tracking-[0.2em]">
                Event Category
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {/* <div className="grid grid-cols-3 gap-4"> */}
                <select
                  value={formData.category}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="bg-slate-50 border-2 border-transparent rounded-2xl p-2 focus:border-[#00e5ff] outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {/* </div> */}
              </div>
            </section>
            {/*  pricing */}
            <div className="flex items-center gap-4">
              <label className="font-black text-sm">Is this event free?</label>

              <button
                type="button"
                onClick={toggleIsFree}
                className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  formData.isFree
                    ? "bg-[#00e5ff] text-[#004d4d]"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {formData.isFree ? "Free Event" : "Paid Event"}
              </button>
            </div>
            {/* Ticket Price only if not free */}
            {!formData.isFree && (
              <InputField
                label="Ticket Price"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                placeholder="Enter price"
                type="number"
              />
            )}
            <InputField
              label="Total Tickets"
              name="totalTickets"
              value={formData.totalTickets}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 100"
            />
            {/* Temporal Details */}
            <section className="space-y-4">
              <h3 className="text-sm font-black text-[#004d4d] uppercase tracking-[0.2em]">
                Temporal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DATE SECTION */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                    Start Date
                  </label>

                  <div className="relative">
                    <Calendar
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full bg-slate-50 rounded-2xl p-5 pl-14 font-bold outline-none border-2 border-transparent focus:border-[#00e5ff]"
                    />
                  </div>

                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                    End Date
                  </label>

                  <div className="relative">
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full bg-slate-50 rounded-2xl p-5 font-bold outline-none border-2 border-transparent focus:border-[#00e5ff]"
                    />
                  </div>
                </div>

                {/* TIME SECTION */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                    Start Time
                  </label>

                  <div className="relative">
                    <Clock
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="w-full bg-slate-50 rounded-2xl p-5 pl-14 font-bold outline-none border-2 border-transparent focus:border-[#00e5ff]"
                    />
                  </div>

                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                    End Time
                  </label>

                  <div className="relative">
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="w-full bg-slate-50 rounded-2xl p-5 font-bold outline-none border-2 border-transparent focus:border-[#00e5ff]"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="space-y-4">
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Lagos"
              />
              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Lagos State"
              />
              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. Nigeria"
              />
            </section>
            {/* Description */}
            <section className="space-y-4">
              <InputField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the atmosphere, talent, and experience..."
                type="textarea"
              />
            </section>
            <InputField
              label="Tags (comma separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="music, live, nightlife"
            />
            <InputField
              label="Entry Requirements (comma separated)"
              name="entryRequirements"
              value={formData.entryRequirements}
              onChange={handleChange}
              placeholder="18+, ID required"
            />
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreedToRefundPolicy"
                checked={formData.agreedToRefundPolicy}
                onChange={handleChange}
                className="mt-1"
              />

              <label className="text-sm text-slate-600">
                I agree to the refund policy and event guidelines
              </label>
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="space-y-8">
            {/* Media Upload */}
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 text-center flex flex-col items-center gap-6">
              {/* ICON */}
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00e5ff]">
                <ImageIcon size={32} />
              </div>

              {/* TEXT */}
              <div>
                <p className="font-black text-slate-900 text-sm mb-1">
                  Upload Cover Image
                </p>
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">
                  Recommended: 1920x1080px (Max 5MB)
                </p>
              </div>

              {/* FILE INPUT */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="bannerUpload"
              />

              <label
                htmlFor="bannerUpload"
                className="cursor-pointer bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#004d4d] transition-all"
              >
                Select Image
              </label>

              {/* IMAGE PREVIEW (IMPORTANT UPGRADE) */}
              {formData.bannerImage && (
                <div className="w-full mt-4">
                  <img
                    src={URL.createObjectURL(formData.bannerImage)}
                    alt="Preview"
                    className="rounded-2xl w-full object-cover max-h-48"
                  />
                </div>
              )}
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
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full md:w-auto bg-[#00e5ff] text-[#004d4d] px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:brightness-105 transition-all shadow-lg shadow-cyan-400/20 active:scale-95 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Event"}
            <ChevronRight size={20} />
          </button>
        </footer>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;
