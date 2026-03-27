import { FaClock, FaChevronRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const ServiceComponent = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#1a1a1a] group rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-[#222] border border-white/5 hover:border-amber-500/30 shadow-xl">
      
      {/* Top Image Section */}
      <div className="relative w-full h-52 md:h-60 rounded-[2rem] overflow-hidden">
        <img 
          src={item.img} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={item.title}
        />
        
        {/* Dark Mode Price Tag */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          <span className="text-amber-500 font-bold text-lg">₹{item.price}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-2 py-6  ">
        <div className="flex justify-between items-center items-start mb-3">
          <h2 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors tracking-tight">
            {item.title}
          </h2>
          <div className="flex items-center gap-1 w-30 justify-center   text-amber-500/80 font-bold text-[10px] uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded-md">
            <FaClock className="" size={12} />
            {item.duration}
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-2">
          {item.description || "Premium grooming tailored to your style by our top professionals."}
        </p>

        {/* Interactive Action Bar */}
        <div 
          onClick={() => navigate("/appointment", { state: item })} 
          className="group/btn w-full flex items-center justify-between bg-white/5 hover:bg-amber-500 p-2 pl-6 rounded-2xl transition-all duration-300 cursor-pointer border border-white/5"
        >
          <span className="text-gray-300 group-hover/btn:text-black font-extrabold text-sm uppercase tracking-wider">
            Book Now
          </span>
          <div className="bg-amber-500 group-hover/btn:bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors">
            <FaChevronRight className="text-black group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;