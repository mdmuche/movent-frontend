import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { verifyPayment } from "../../store/thunks/checkoutThunks";

import { CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";

function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!reference) {
        setStatus("error");
        setMessage("No payment reference found");
        return;
      }

      try {
        const res = await dispatch(verifyPayment(reference)).unwrap();

        setStatus("success");
        setMessage(res.message || "Payment successful");
      } catch (err) {
        setStatus("error");
        setMessage(err || "Payment verification failed");
        toast.error(err);
      }
    };

    verify();
  }, [reference, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-lg">
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin mx-auto mb-4 text-cyan-500" />
            <h2 className="font-bold text-xl">Verifying Payment...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto mb-4 text-green-500" size={48} />
            <h2 className="font-black text-2xl">Payment Successful 🎉</h2>
            <p className="text-slate-500 mt-2">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto mb-4 text-red-500" size={48} />
            <h2 className="font-black text-2xl">Payment Failed</h2>
            <p className="text-slate-500 mt-2">{message}</p>
          </>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 flex items-center justify-center gap-2 w-full bg-cyan-500 text-white py-3 rounded-xl font-bold"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PaymentResult;
