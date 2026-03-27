import React, { useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { FiMail, FiLoader, FiKey, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/forget-password", { email });
      if (response.data.success) {
        setStatus({ type: "success", message: "Reset link sent to your email!" });
        setEmail("");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Something went wrong" 
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full bg-black/50 text-white border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm placeholder:text-gray-600";
  const iconBase = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors";

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 no-scrollbar overflow-y-auto relative"
    >
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1213&auto=format&fit=crop')" }}
      />

      <div className="w-full max-w-[340px] bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/10 relative z-10">
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-gray-500 hover:text-amber-500 transition-colors"
        >
          <FiArrowLeft size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-amber-500/10 rounded-2xl text-amber-500 mb-4 shadow-inner">
            <FiKey size={32} />
          </div>
          <h2 className="text-white text-3xl font-black tracking-tight">Forgot <span className="text-amber-500">Pass</span></h2>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-2">
            No worries, we'll send you instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group relative">
            <FiMail className={iconBase} />
            <input
              type="email"
              required
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputBase}
            />
          </div>

          {status.message && (
            <div className={`text-[10px] font-bold uppercase p-3 rounded-xl text-center tracking-wider ${
              status.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            }`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-600 text-xs uppercase tracking-widest"
          >
            {loading ? <FiLoader className="animate-spin text-xl" /> : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p 
            onClick={() => navigate("/login")}
            className="text-gray-500 hover:text-amber-500 text-xs font-black uppercase tracking-tighter cursor-pointer transition-colors"
          >
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;