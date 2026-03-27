import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useState } from "react";
import { FiMail, FiLock, FiLoader, FiLogIn } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login", data);

      if (res.data.success) {
        navigate("/");
        reset();
      }
    } catch (error) {
      console.log("Error while logging in:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  // Tailwind Class for Inputs
  const inputBase = "w-full bg-black/50 text-white border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm placeholder:text-gray-600";
  const iconBase = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors";

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 py-10 no-scrollbar overflow-y-auto relative"
    >
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 grayscale"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1213&auto=format&fit=crop')" }}
      />
      
      {/* Subtle Glow Effect */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-[360px] bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/10 relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-amber-500/10 rounded-2xl text-amber-500 mb-4 shadow-inner">
            <FiLogIn size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Welcome <span className="text-amber-500">Back</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-2">Login to your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Email Field */}
          <div className="group relative">
            <FiMail className={iconBase} />
            <input
              type="email"
              placeholder="Email Address"
              className={inputBase}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase mt-1.5 ml-2">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="group relative">
            <FiLock className={iconBase} />
            <input
              type="password"
              placeholder="Password"
              className={inputBase}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase mt-1.5 ml-2">{errors.password.message}</p>}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pr-1">
            <span 
              onClick={() => navigate("/forget-password")} 
              className="text-amber-500/80 hover:text-amber-500 text-[11px] font-black uppercase tracking-tighter cursor-pointer transition-colors"
            >
              Forgot Password?
            </span>
          </div>

          {/* Login Button with Loader */}
          <button
            disabled={loading}
            className="w-full bg-amber-500 text-black font-black py-4 rounded-2xl mt-2 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-500/20 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-amber-600 text-sm uppercase tracking-widest"
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-10 text-xs font-medium">
          New to SalonX?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-amber-500 cursor-pointer hover:underline font-black tracking-tighter"
          >
            CREATE ACCOUNT
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;