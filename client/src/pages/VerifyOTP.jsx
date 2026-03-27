import { useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { FiShield, FiLoader } from "react-icons/fi";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/verify-otp", { otp });

      if (response.data.success) {
        navigate("/");
        // Note: You might want to trigger a success toast here instead of an alert
      }
    } catch (error) {
      console.error("Verification Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 no-scrollbar overflow-y-auto"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1213&auto=format&fit=crop')",
      }}
    >
      <div className="w-full max-w-[340px] p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-amber-500/10 rounded-2xl text-amber-500 mb-4 shadow-inner">
              <FiShield size={32} />
            </div>
            <h2 className="text-white text-3xl font-black tracking-tight">Verify <span className="text-amber-500">OTP</span></h2>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-2 px-2">
              We've sent a 6-digit code to your email
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="0 0 0 0 0 0"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // Only allow numbers
                required
                className="bg-black/40 text-white border border-white/10 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 w-full text-center text-2xl font-black tracking-[0.5em] placeholder:text-gray-700 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="bg-amber-500 text-black font-black py-4 rounded-2xl hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
            >
              {loading ? <FiLoader className="animate-spin text-xl" /> : "Verify & Continue"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs font-medium">
              Didn't receive the code?
            </p>
            <button 
              className="mt-1 text-amber-500 hover:text-amber-400 text-xs font-black uppercase tracking-tighter transition-colors"
              onClick={() => {/* Add resend logic here */}}
            >
              Resend New OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;