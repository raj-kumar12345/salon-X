import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { FiBriefcase, FiMapPin, FiScissors } from "react-icons/fi";

const RegisterAsBarber = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/barber/register", data);
      if (res.data.success) {
        navigate("/barber-home");
      }
      reset();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong. Try again!");
    }
  };

  // Common input styling class for cleaner JSX
  const inputStyle = "w-full bg-black/40 text-white border border-white/10 p-3.5 rounded-xl outline-none focus:border-amber-500 transition-all text-sm placeholder:text-gray-600";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]  relative overflow-hidden">
      
      {/* Dynamic Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1470&auto=format&fit=crop')" }}
      />

      <div className="relative z-10 bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/10">
        
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl text-amber-500 mb-4">
            <FiScissors size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Register as <span className="text-amber-500">Barber</span>
          </h1>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">Join the SalonX Elite</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Shop Name */}
          <div className="space-y-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Shop Name"
                className={inputStyle}
                {...register("shopName", { required: "Shop Name is required" })}
              />
            </div>
            {errors.shopName && <p className="text-red-500 text-[10px] font-bold uppercase ml-2">{errors.shopName.message}</p>}
          </div>

          {/* Experience */}
          <div className="space-y-1">
            <div className="relative">
              <FiBriefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="number"
                placeholder="Experience (Years)"
                className={inputStyle}
                {...register("experience", {
                  required: "Experience is required",
                  min: { value: 0, message: "Invalid experience" },
                })}
              />
            </div>
            {errors.experience && <p className="text-red-500 text-[10px] font-bold uppercase ml-2">{errors.experience.message}</p>}
          </div>

          {/* Location Details */}
          <div className="pt-2">
            <h2 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 ml-1 flex items-center gap-2">
              <FiMapPin /> Location Details
            </h2>

            {/* City & Pincode stack on very small screens */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="City"
                  className={inputStyle}
                  {...register("location.city", { required: "City is required" })}
                />
              </div>
              <div className="space-y-1">
                <input
                  type="number"
                  placeholder="Pincode"
                  className={inputStyle}
                  {...register("location.pincode", {
                    required: "Required",
                    pattern: {
                      value: /^[1-9][0-9]{5}$/,
                      message: "Invalid",
                    },
                  })}
                />
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <input
                type="text"
                placeholder="Address / House No"
                className={inputStyle}
                {...register("location.address", { required: "Address is required" })}
              />
            </div>
            
            {(errors?.location?.city || errors?.location?.pincode || errors?.location?.address) && (
              <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2">
                Check location fields
              </p>
            )}
          </div>

          <button className="w-full bg-amber-500 text-black font-black py-4 rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 active:scale-95 mt-4 text-sm uppercase tracking-wider">
            Register Now
          </button>

          <p className="text-center text-gray-500 mt-6 text-xs font-medium">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login-barber")}
              className="text-amber-500 cursor-pointer hover:underline font-black"
            >
              LOGIN
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterAsBarber;