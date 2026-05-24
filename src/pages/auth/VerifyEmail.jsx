import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { verificationToken } = useParams();

  const hasVerified = useRef(false);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasVerified.current) return;

    hasVerified.current = true;

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/v1/auth/verify-email/${verificationToken}`,
        );

        setSuccess(true);
        setMessage(response.data?.message || "Email verified successfully");
      } catch (error) {
        setSuccess(false);
        setMessage(
          error.response?.data?.message ||
            "Invalid or expired verification token.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (verificationToken) {
      verifyEmail();
    }
  }, [verificationToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {loading ? (
          <>
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Verifying Email...</h2>
            <p className="text-gray-600">
              Please wait while we verify your account.
            </p>
          </>
        ) : success ? (
          <>
            <div className="text-green-500 text-6xl mb-4">✔</div>

            <h2 className="text-2xl font-bold mb-2">Email Verified</h2>

            <p className="text-gray-600 mb-6">{message}</p>

            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <div className="text-red-500 text-6xl mb-4">✖</div>

            <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>

            <p className="text-gray-600 mb-6">{message}</p>

            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
            >
              Back to Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
