import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Identity */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter">
              SALON<span className="text-amber-500">X</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Redefining grooming with doorstep professional services. Quality, hygiene, and style delivered at your convenience.
            </p>
            <div className="flex gap-4 text-gray-400">
              <FaInstagram className="cursor-pointer hover:text-amber-500 transition-colors" size={20} />
              <FaLinkedin className="cursor-pointer hover:text-amber-500 transition-colors" size={20} />
              <FaGithub className="cursor-pointer hover:text-amber-500 transition-colors" size={20} />
              <FaWhatsapp className="cursor-pointer hover:text-green-500 transition-colors" size={20} />
            </div>
          </div>

          {/* 2. Navigation */}
          <div>
            <h3 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-6">Explore</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li onClick={() => navigate("/")} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full"></span> Home
              </li>
              <li onClick={() => navigate("/service")} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full"></span> Services
              </li>
              <li onClick={() => navigate("/appointment")} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full"></span> Book Now
              </li>
              <li onClick={() => navigate("/about")} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full"></span> Our Story
              </li>
            </ul>
          </div>

          {/* 3. Top Services */}
          <div>
            <h3 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-6">Popular</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-amber-500 cursor-default transition-colors">Classic Haircut</li>
              <li className="hover:text-amber-500 cursor-default transition-colors">Beard Sculpting</li>
              <li className="hover:text-amber-500 cursor-default transition-colors">Luxury Facial</li>
              <li className="hover:text-amber-500 cursor-default transition-colors">Wedding Packages</li>
            </ul>
          </div>

          {/* 4. Join the Team */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
            <h3 className="text-white font-bold mb-3">Become a Partner</h3>
            <p className="text-gray-500 text-xs mb-4 leading-relaxed">
              Are you a professional barber? Join SalonX and grow your business with us.
            </p>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-3 rounded-xl transition-all uppercase tracking-tighter">
              Register as Barber
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} SALONX PLATFORM. DESIGNED FOR EXCELLENCE.
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;