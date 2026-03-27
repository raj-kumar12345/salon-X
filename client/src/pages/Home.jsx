import React from "react";
import { useNavigate } from "react-router";
import { FiClock, FiShield, FiCheckCircle, FiArrowRight } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[90vh] md:h-screen w-full flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-[center_left_25%] md:bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://barbershop73.by/wp-content/uploads/2022/02/slide-notebook-2.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a] md:bg-gradient-to-r md:from-black md:via-black/60 md:to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 w-full pt-10">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 mb-4 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest">
              ✨ Premium Doorstep Grooming
            </div>

            <h1 className="text-[34px] xs:text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Fresh Cuts That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">
                Boost Your Style
              </span>
            </h1>

            <p className="mt-4 text-sm md:text-xl text-gray-400 max-w-xl leading-relaxed">
              We bring <span className="text-white font-medium">expert barbers</span> directly to your location. Fast, professional, and tailored to you.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate("/service")} className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-extrabold rounded-2xl md:rounded-full transition-all active:scale-95 text-sm shadow-lg shadow-amber-500/20">
                Book Appointment Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. IMAGE SHOWCASE SECTION (Responsive at 350px) */}
      <div className="relative z-10 px-5 md:px-12 -mt-20 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          
          {/* Image 1: Signature Haircuts */}
          <div className="group relative h-64 md:h-80 rounded-[2rem] overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Haircut Service" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white">Signature Haircuts</h3>
              <p className="text-amber-500 text-xs font-bold flex items-center gap-1 cursor-pointer" onClick={() => navigate("/service")}>
                View Styles <FiArrowRight />
              </p>
            </div>
          </div>

          {/* Image 2: Beard Grooming */}
          <div className="group relative h-64 md:h-80 rounded-[2rem] overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Beard Service" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white">Beard Sculpting</h3>
              <p className="text-amber-500 text-xs font-bold flex items-center gap-1 cursor-pointer" onClick={() => navigate("/service")}>
                Book Session <FiArrowRight />
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. TRUST INDICATORS */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 pb-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 py-10 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-amber-500"><FiClock size={20} /></div>
            <div><p className="text-white font-bold text-sm">15-45 Mins</p><p className="text-gray-500 text-[10px] font-bold uppercase">Average Arrival</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-amber-500"><FiShield size={20} /></div>
            <div><p className="text-white font-bold text-sm">Verified Pros</p><p className="text-gray-500 text-[10px] font-bold uppercase">Background Checked</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-amber-500"><FiCheckCircle size={20} /></div>
            <div><p className="text-white font-bold text-sm">Sanitized Kits</p><p className="text-gray-500 text-[10px] font-bold uppercase">Hygiene Guaranteed</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;