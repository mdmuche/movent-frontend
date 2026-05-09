import {
  ChevronLeft,
  Lock,
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";
import Navbar from "../components/common/Navigation/Navbar";
import Footer from "../components/common/Footer";
import Step from "../components/Step";
import InputGroup from "../components/InputGroup";
import PriceRow from "../components/PriceRow";
import TrustBadge from "../components/TrustBadge";
import { events } from "../data/moventData";
import { useParams } from "react-router-dom";

function Checkout() {
  const eventId = useParams().id;
  const event = events.find((e) => e.id === Number(eventId));
  // 1. Convert price string "$85.00" to a number 85
  const basePrice = parseFloat(event.price.replace(/[^0-9.-]+/g, ""));

  // 2. Define your fees
  const serviceFee = 14.5;
  const processingFee = 3.2;

  // 3. Calculate total (assuming 2 tickets based on your UI)
  const ticketCount = 2;
  const subtotal = basePrice * ticketCount;
  const grandTotal = subtotal + serviceFee + processingFee;
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20">
        {/* Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <Step number="1" label="Billing" active />
              <div className="hidden md:block w-20 h-[1px] bg-slate-200" />
              <Step number="2" label="Payment" />
              <div className="hidden md:block w-20 h-[1px] bg-slate-200" />
              <Step number="3" label="Receipt" />
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information Card */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-[#004d4d] mb-8 font-['Syne']">
                Billing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" placeholder="Johnathan Doe" />
                <InputGroup
                  label="Email Address"
                  placeholder="john@architecture.com"
                  type="email"
                />
                <div className="md:col-span-2">
                  <InputGroup
                    label="Street Address"
                    placeholder="123 Curatorial Way"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method Card */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-[#004d4d] font-['Syne']">
                  Payment Method
                </h2>
                <div className="flex gap-2 text-slate-400">
                  <CreditCard size={20} />
                  <Wallet size={20} />
                </div>
              </div>

              {/* Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <label className="relative flex items-center p-4 border-2 border-[#004d4d] rounded-2xl cursor-pointer bg-slate-50">
                  <input
                    type="radio"
                    name="payment"
                    className="w-5 h-5 accent-[#004d4d]"
                    defaultChecked
                  />
                  <span className="ml-3 font-bold text-slate-900 flex items-center gap-2">
                    Credit/Debit Card <CreditCard size={16} />
                  </span>
                </label>
                <label className="relative flex items-center p-4 border-2 border-transparent bg-slate-50 rounded-2xl cursor-pointer hover:border-slate-200 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    className="w-5 h-5 accent-[#004d4d]"
                  />
                  <span className="ml-3 font-bold text-slate-500 flex items-center gap-2">
                    Paystack Secure{" "}
                    <ShieldCheck size={16} className="text-cyan-500" />
                  </span>
                </label>
              </div>

              {/* Card Details */}
              <div className="space-y-6">
                <div className="relative">
                  <InputGroup
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                  />
                  <Lock
                    className="absolute right-4 bottom-4 text-slate-400"
                    size={18}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <InputGroup label="Expiry Date" placeholder="MM/YY" />
                  <InputGroup label="CVV" placeholder="***" type="password" />
                </div>
              </div>
            </section>

            {/* Footer Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
              <button className="flex items-center gap-2 text-[#004d4d] font-bold hover:gap-3 transition-all">
                <ChevronLeft size={20} /> Back to Events
              </button>
              <p className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <Lock size={14} /> SSL Encrypted Connection
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="space-y-6">
            <>
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-8">
                <h3 className="text-xl font-black text-[#004d4d] mb-6">
                  Order Summary
                </h3>

                {/* Event Preview */}
                <div className="flex gap-4 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-slate-900 overflow-hidden shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight mb-2">
                      {event.title}
                    </h4>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Calendar size={10} /> {event.date.month}{" "}
                        {event.date.day} • {event.time || "09:00 AM"}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <MapPin size={10} /> {event.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-4 mb-8 border-b border-slate-100 pb-8">
                  <PriceRow label="General Admission x 2" value="$298.00" />
                  <PriceRow label="Service Fee" value="$14.50" />
                  <PriceRow label="Processing Fee" value="$3.20" />
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 mb-8">
                  <input
                    placeholder="Promo Code"
                    className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-400"
                  />
                  <button className="bg-[#e2e8f0] text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#cbd5e1] transition-all">
                    Apply
                  </button>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Total Amount
                  </span>
                  <span className="text-4xl font-black text-[#004d4d] tracking-tight">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                <button className="w-full bg-[#00e5ff] text-[#004d4d] py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-lg shadow-cyan-200 mb-6 group">
                  Confirm & Pay Now{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {/* Delivery Note */}
                <div className="flex gap-3 bg-slate-50 p-4 rounded-2xl mb-6">
                  <Zap size={18} className="text-cyan-500 shrink-0" />
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                    Tickets will be delivered to your email instantly.
                  </p>
                </div>

                {/* Legal */}
                <p className="text-[9px] text-slate-400 text-center leading-relaxed font-bold">
                  By clicking "Confirm & Pay Now", you agree to our <br />
                  <span className="text-[#004d4d] underline cursor-pointer">
                    Refund Policy
                  </span>{" "}
                  and{" "}
                  <span className="text-[#004d4d] underline cursor-pointer">
                    Terms of Service
                  </span>
                  . All sales are final 48 hours before the event.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex justify-center gap-8 pt-4">
                <TrustBadge icon={<Shield size={20} />} label="PCI COMPLIANT" />
                <TrustBadge
                  icon={<ShieldCheck size={20} />}
                  label="SSL SECURE"
                />
                <TrustBadge
                  icon={<CheckCircle2 size={20} />}
                  label="PROTECTED"
                />
              </div>
            </>
          </aside>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
