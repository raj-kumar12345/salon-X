import React from "react";
import { FiCheckCircle, FiAward, FiMapPin, FiClock } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white pt-24 pb-20 overflow-x-hidden relative">
      
      {/* Decorative Background Elements - Scaled down for mobile */}
      <div className="absolute top-0 right-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-amber-500/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-amber-500/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-5 md:px-12">
        
        {/* 1. Hero Heading - Adjusted for 350px */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-[38px] xs:text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-tight">
            WE ARE <span className="text-amber-500 underline decoration-amber-500/20 underline-offset-4">SALONX</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
            Redefining the grooming experience. We’ve traded waiting rooms for living rooms, bringing premium services to your doorstep.
          </p>
        </div>

        {/* 2. Brand Story Section (Image Stacks first on mobile) */}
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 mb-24 md:mb-32">
          <div className="relative w-full lg:w-1/2 group">
            <div className="absolute -inset-2 bg-amber-500/10 rounded-[1.5rem] md:rounded-[2.5rem] blur-lg opacity-50 transition duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70"
              alt="Professional Barber"
              className="relative w-full h-[280px] md:h-[400px] object-cover rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl"
            />
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Our Origin</h2>
            <h3 className="text-2xl md:text-4xl font-bold mb-4">Born from a simple need for convenience.</h3>
            <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-6">
              SalonX started with a vision to eliminate the hassle. No more commutes, no more queues. We curate the city's finest grooming talent and send them to you.
            </p>
            <div className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl justify-center lg:justify-start">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><FiAward size={20}/></div>
              <p className="font-bold text-gray-300 uppercase text-[10px] tracking-widest">Certified Professional Experts</p>
            </div>
          </div>
        </div>

        {/* 3. Mission Section (Reverse stack on mobile for visual variety) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 md:gap-16 mb-24 md:mb-32">
          <div className="relative w-full lg:w-1/2">
             <div className="absolute -inset-2 bg-amber-500/10 rounded-[1.5rem] blur-lg opacity-50"></div>
            <img
              src="https://i.pinimg.com/474x/6f/4b/c5/6f4bc567ad70479f58c36bf0ef14b48e.jpg"
              alt="Grooming Service"
              className="relative w-full h-[280px] md:h-[400px] object-cover rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl"
            />
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Our Commitment</h2>
            <h3 className="text-2xl md:text-4xl font-bold mb-4">Quality that meets your lifestyle.</h3>
            <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8">
              Every SalonX pro carries a sanitized, premium grooming kit. We ensure you look and feel your absolute best wherever you are.
            </p>
            <div className="flex justify-center lg:justify-start gap-10">
               <div><p className="text-amber-500 text-2xl md:text-3xl font-black">500+</p><p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">Active Pros</p></div>
               <div><p className="text-amber-500 text-2xl md:text-3xl font-black">15k+</p><p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">Happy Cuts</p></div>
            </div>
          </div>
        </div>

        {/* 4. Why Choose Us Grid - Stacked for 350px */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
          <h2 className="text-2xl md:text-5xl font-black mb-10 md:mb-16">The SalonX Edge</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <FiClock />, title: "Instant Booking", desc: "Book in seconds. Your time, your location, our expertise." },
              { icon: <FiCheckCircle />, title: "Verified Pros", desc: "Rigorous background checks & assessments for every barber." },
              { icon: <FiMapPin />, title: "Hyper Local", desc: "Available across all major tech hubs and neighborhoods." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-amber-500 text-black flex items-center justify-center rounded-xl mb-5 shadow-lg shadow-amber-500/20">
                  {React.cloneElement(item.icon, { size: 24 })}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-xs md:text-base px-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;