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
import { toast } from "react-toastify";
import Navbar from "../../components/common/Navigation/Navbar";
import Footer from "../../components/common/Footer";
import Step from "../../components/Step";
import PriceRow from "../../components/PriceRow";
import TrustBadge from "../../components/TrustBadge";
import { useParams } from "react-router-dom";
import {
  applyPromoCode,
  initiateCheckout,
} from "../../store/thunks/checkoutThunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchEvent } from "../../store/thunks/eventThunks";
import InputField from "../../components/InputField";

function Checkout() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [ticketCount, setTicketCount] = useState(1);
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    email: "",
    streetAddress: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoLoading, setPromoLoading] = useState(false);

  const { event, loading } = useSelector((state) => state.events);

  const maxTickets = event?.settings?.maximumTicketsPerPurchase || 10;
  function handleMaximumTicket(e) {
    const value = Number(e.target.value);

    if (value > maxTickets) {
      toast.error(`Maximum ${maxTickets} tickets per purchase`);
      setTicketCount(maxTickets);
      return;
    }

    if (value < 1) {
      setTicketCount(1);
      return;
    }

    setTicketCount(value);
  }

  useEffect(() => {
    dispatch(fetchEvent(slug));
  }, [dispatch, slug]);

  const handleChange = (e) => {
    setBillingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //function to handle apply promocode
  const handleApplyPromo = async () => {
    if (!promoCode) return toast.error("Enter a promo code");

    try {
      setPromoLoading(true);

      const res = await dispatch(
        applyPromoCode({
          slug,
          promoCode,
        }),
      ).unwrap();

      setDiscount(res.data.discountAmount || 0);

      toast.success("Promo applied successfully");
    } catch (err) {
      toast.error(err?.message || "Invalid promo code");
    } finally {
      setPromoLoading(false);
    }
  };

  if (loading || !event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  // 1. Convert price string "₦85.00" to a number 85
  const basePrice = event.ticketPrice || 0;

  // 2. Define your fees
  const serviceFee = 14.5;
  const processingFee = 3.2;

  // 3. Calculate total
  const subtotal = basePrice * ticketCount;
  const grandTotal = subtotal + serviceFee + processingFee - discount;

  const handleCheckout = async () => {
    try {
      const res = await dispatch(
        initiateCheckout({
          slug,
          data: {
            quantity: ticketCount,
            billingInfo,
          },
        }),
      ).unwrap();

      window.location.href = res.data.authorization_url;
    } catch (err) {
      toast.error(err);
    }
  };

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
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={billingInfo.fullName}
                  onChange={handleChange}
                  placeholder="Johnathan Doe"
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={billingInfo.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
                <div className="md:col-span-2">
                  <InputField
                    label="Street Address"
                    name="streetAddress"
                    type="text"
                    value={billingInfo.streetAddress}
                    onChange={handleChange}
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
              <div className="mb-8">
                <h3 className="font-bold text-slate-900 mb-4">
                  Payment Method
                </h3>

                <label className="flex items-center p-4 border-2 border-[#004d4d] rounded-2xl bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="w-5 h-5 accent-[#004d4d]"
                    defaultChecked
                  />

                  <div className="ml-3">
                    <p className="font-bold flex items-center gap-2">
                      Paystack Secure{" "}
                      <ShieldCheck size={16} className="text-cyan-500" />
                    </p>
                    <p className="text-xs text-slate-500">
                      Secure payment powered by Paystack
                    </p>
                  </div>
                </label>

                {/* Disabled Card Option */}
                <div className="mt-4 relative opacity-40">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <span className="text-xs font-bold bg-slate-200 px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>

                  <div className="p-4 border-2 border-slate-200 rounded-2xl">
                    <p className="font-bold text-slate-500 flex items-center gap-2">
                      Credit/Debit Card <CreditCard size={16} />
                    </p>

                    <div className="mt-4 space-y-3">
                      <div className="h-10 bg-slate-100 rounded-lg" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-10 bg-slate-100 rounded-lg" />
                        <div className="h-10 bg-slate-100 rounded-lg" />
                      </div>
                    </div>
                  </div>
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
                      src={event.bannerImage?.secure_url}
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
                        <Calendar size={10} />{" "}
                        {new Date(event.startDate).toLocaleDateString()} •{" "}
                        {event.startTime}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <MapPin size={10} /> {event.venue}, {event.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2">
                    Number of Tickets
                  </label>

                  <input
                    type="number"
                    min={1}
                    max={maxTickets}
                    value={ticketCount}
                    onChange={handleMaximumTicket}
                    className="w-full border border-slate-200 rounded-xl p-3"
                  />

                  <p className="text-xs text-slate-500 mt-2">
                    Maximum tickets per purchase:{" "}
                    <span className="font-bold text-[#004d4d]">
                      {maxTickets}
                    </span>
                  </p>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-4 mb-8 border-b border-slate-100 pb-8">
                  <PriceRow
                    label={`General Admission x ${ticketCount}`}
                    value={`₦${subtotal.toFixed(2)}`}
                  />
                  <PriceRow
                    label="Service Fee"
                    value={`₦${serviceFee.toFixed(2)}`}
                  />
                  <PriceRow
                    label="Processing Fee"
                    value={`₦${processingFee.toFixed(2)}`}
                  />
                  {discount > 0 && (
                    <PriceRow
                      label="Promo Discount"
                      value={`- $${discount.toFixed(2)}`}
                    />
                  )}
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 mb-8">
                  <input
                    value={promoCode}
                    type="text"
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code"
                    className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-400"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoLoading}
                    className="bg-[#e2e8f0] text-slate-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#cbd5e1] transition-all disabled:opacity-50"
                  >
                    {promoLoading ? "Applying..." : "Apply"}
                  </button>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Total Amount
                  </span>
                  <span className="text-4xl font-black text-[#004d4d] tracking-tight">
                    ₦{grandTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#00e5ff] text-[#004d4d] py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-lg shadow-cyan-200 mb-6 group"
                >
                  Confirm & Pay Now
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
