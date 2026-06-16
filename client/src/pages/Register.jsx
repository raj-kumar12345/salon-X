import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock, FiLoader } from "react-icons/fi";

const Register = () => {
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
      const response = await axiosInstance.post("/auth/register", data);
      
      if (response.data.success) {
        // Safe check: data pass kiya taaki verify-otp page par access kar sakein
        navigate("/verify-otp", { state: { email: data.email } });
        reset();
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Tailwind Class for Inputs
  const inputBase = "w-full bg-black/50 text-white border border-white/10 p-3.5 pl-11 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm placeholder:text-gray-600";
  const iconBase = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors";

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-10 no-scrollbar overflow-y-auto"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1213&auto=format&fit=crop')",
      }}
    >
      <div className="w-full max-w-[380px] bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/10">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight">
            Join <span className="text-amber-500">SalonX</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-2">Create your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Name Field */}
          <div className="group relative">
            <FiUser className={iconBase} />
            <input
              type="text"
              placeholder="Full Name"
              className={inputBase}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-2 tracking-wide">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="group relative">
            <FiMail className={iconBase} />
            <input
              type="email"
              placeholder="Email Address"
              className={inputBase}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Enter valid email" },
              })}
            />
            {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-2 tracking-wide">{errors.email.message}</p>}
          </div>

          {/* Mobile Field */}
          <div className="group relative">
            <FiPhone className={iconBase} />
            <input
              type="text"
              placeholder="Mobile Number"
              className={inputBase}
              {...register("mobile", {
                required: "Mobile is required",
                pattern: { value: /^[6-9]\d{9}$/, message: "Invalid Indian number" },
              })}
            />
            {errors.mobile && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-2 tracking-wide">{errors.mobile.message}</p>}
          </div>

          {/* Password Field */}
          <div className="group relative">
            <FiLock className={iconBase} />
            <input
              type="password"
              placeholder="Password"
              className={inputBase}
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-2 tracking-wide">{errors.password.message}</p>}
          </div>

          {/* Submit Button with Loader */}
          <button
            disabled={loading}
            className="w-full bg-amber-500 text-black font-black py-4 rounded-2xl mt-4 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-500/20 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-amber-600 text-sm uppercase tracking-widest"
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-xs font-medium">
          Already a member?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-amber-500 cursor-pointer hover:underline font-black tracking-tighter"
          >
            LOGIN HERE
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;