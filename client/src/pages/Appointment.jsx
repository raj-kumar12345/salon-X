import React, { useState } from "react";
import { useLocation } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { setBarbers } from "../features/barberSlice";
import { FiMapPin, FiCalendar, FiClock, FiSearch, FiUser, FiHome } from "react-icons/fi";

const Appointment = () => {
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const serviceData = location.state;

  const dispatch = useDispatch();
  const { barbers } = useSelector((state) => state.barber);

  const [formData, setFormData] = useState({
    location: { houseNo: "", pincode: "", city: "" },
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nesting check for location object
    if (["houseNo", "pincode", "city"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      // For date and time top-level attributes
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const res = await axiosInstance.post("/barber/fetch", {
        location: formData.location,
      });
      if (res.data.success) {
        dispatch(setBarbers(res.data.barbers));
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching barbers");
    } finally {
      setLoading(false);
    }
  };

  const handleBookBarber = (barber) => {
    const phone = barber.userId?.mobile;
    const message = `Hello ${barber.userId?.name}, %0A%0AI want to book *${serviceData?.title}* at my Home. %0A%0A💇 *Service Details:* %0A• Price: ₹${serviceData?.price} %0A• Duration: ${serviceData?.duration} %0A%0A📅 *Schedule:* %0A• Date: ${formData.date} %0A• Time: ${formData.time} %0A%0A📍 *Address:* %0A${formData.location.houseNo}, ${formData.location.city} - ${formData.location.pincode} %0A%0AConfirm if you are available?`;

    const whatsappURL = `https://wa.me/91${phone}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 text-white px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-10 text-center">
          <h1 className="text-[28px] xs:text-3xl md:text-5xl font-black mb-3 tracking-tight">
            Finalize <span className="text-amber-500">Booking</span>
          </h1>
          <p className="text-gray-500 text-xs md:text-base px-2">Complete details to find barbers near you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* LEFT: SERVICE SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] sticky top-28 backdrop-blur-md">
              <h2 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                Review Service
              </h2>
              <div className="flex items-center gap-4 mb-5">
                <img src={serviceData?.img} alt="service" className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-white/10" />
                <div>
                  <h3 className="font-bold text-base md:text-xl leading-tight">{serviceData?.title}</h3>
                  <p className="text-amber-500 font-black text-lg">₹{serviceData?.price}</p>
                </div>
              </div>
              <div className="space-y-3 pt-5 border-t border-white/5 text-gray-400 text-xs md:text-sm">
                <div className="flex items-center gap-3"><FiClock className="text-amber-500" size={16}/> <span>{serviceData?.duration}</span></div>
                <div className="flex items-center gap-3"><FiHome className="text-amber-500" size={16}/> <span>Doorstep Grooming</span></div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE BOOKING FORM */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">House No / Landmark</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input type="text" name="houseNo" required placeholder="Street 12..." value={formData.location.houseNo} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-amber-500 transition-all text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Pincode</label>
                  <input type="text" name="pincode" required placeholder="000 000" value={formData.location.pincode} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-amber-500 transition-all text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">City</label>
                <input type="text" name="city" required placeholder="Select your city" value={formData.location.city} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-amber-500 transition-all text-sm" />
              </div>

              {/* FIXED: Date & Time Picker inputs with explicit color inversion for Dark Mode native controls */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-5 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Select Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    value={formData.date} 
                    onChange={handleChange} 
                    min={new Date().toISOString().split("T")[0]} 
                    className="w-full px-5 py-3.5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-amber-500 text-white text-sm scheme-dark" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Select Time</label>
                  <input 
                    type="time" 
                    name="time" 
                    required 
                    value={formData.time} 
                    onChange={handleChange} 
                    className="w-full px-5 py-3.5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-amber-500 text-white text-sm scheme-dark" 
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-700 text-black font-black py-4 md:py-5 rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/10 text-sm md:text-base mt-4">
                {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></span> : <><FiSearch size={18}/> Find Barbers Nearby</>}
              </button>
            </form>
          </div>
        </div>

        {/* RESULTS SECTION */}
        <div className="mt-16 md:mt-20">
          {searched && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="p-2 bg-amber-500 rounded-lg text-black"><FiUser size={18}/></span> 
                Pros Found ({barbers.length})
              </h2>
              
              {barbers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {barbers.map((barber) => (
                    <div key={barber._id} className="bg-[#111] border border-white/5 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] hover:border-amber-500/50 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="max-w-[70%]">
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-500 transition-colors truncate">{barber.shopName}</h3>
                          <p className="text-gray-500 text-xs mt-1">Exp: <span className="text-gray-300 font-bold">{barber.experience} Yrs</span></p>
                        </div>
                        <div className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter border border-amber-500/20">Verified</div>
                      </div>
                      
                      <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                        <div className="flex items-start gap-2 text-xs text-gray-400">
                          <FiUser className="mt-0.5 text-amber-500 shrink-0" />
                          <span className="truncate">Lead: {barber.userId?.name}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-gray-400">
                          <FiMapPin className="mt-0.5 text-amber-500 shrink-0" />
                          <span className="line-clamp-2">{barber.location?.address}, {barber.location?.city}</span>
                        </div>
                      </div>

                      <button onClick={() => handleBookBarber(barber)} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group/btn text-sm">
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20.52 3.48A11.86 11.86 0 0012.03 0C5.39 0 .01 5.38.01 12.02c0 2.12.55 4.2 1.6 6.03L0 24l6.17-1.62a11.93 11.93 0 005.86 1.5h.01c6.64 0 12.02-5.38 12.02-12.02 0-3.21-1.25-6.22-3.54-8.38zM12.04 21.3h-.01a9.3 9.3 0 01-4.73-1.29l-.34-.2-3.66.96.98-3.57-.22-.36a9.28 9.28 0 01-1.42-4.96c0-5.13 4.17-9.3 9.31-9.3 2.48 0 4.81.96 6.56 2.71a9.23 9.23 0 012.74 6.59c0 5.13-4.17 9.31-9.3 9.31zm5.1-6.97c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.29-1.4-.85-.76-1.42-1.7-1.59-1.98-.17-.28-.02-.43.13-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.34 0 1.38 1 2.71 1.14 2.9.14.19 1.97 3.01 4.77 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.66-.68 1.9-1.33.23-.65.23-1.2.16-1.33-.07-.13-.26-.21-.54-.35z" /></svg>
                        Confirm Booking
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 rounded-[2rem] py-16 text-center border border-white/5 px-6">
                  <p className="text-gray-500 text-sm">😔 No professionals found in this area yet.</p>
                  <button onClick={() => setSearched(false)} className="mt-4 text-amber-500 text-xs font-bold hover:underline uppercase tracking-tighter">Try another location</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;