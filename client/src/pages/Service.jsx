import React, { useState } from 'react';
import ServiceComponent from '../components/ServiceComponent';
import { useSelector } from 'react-redux';

const Service = () => {
  // Redux state se services aur loading dono destructure kiye
  const { services: serviceData, loading } = useSelector((state) => state.service);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Hair", "Beard", "Combo", "Premium", "Luxury"];

  return (
    <div className='min-h-screen w-full bg-[#0a0a0a] pb-20 overflow-x-hidden'>
      
      {/* 1. Header Section */}
      <div className='pt-28 md:pt-32 pb-8 px-4 text-center'>
        <h1 className='text-[32px] xs:text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter'>
          Our <span className='text-amber-500'>Services</span>
        </h1>
        <p className='text-gray-500 text-xs md:text-lg max-w-2xl mx-auto px-2 leading-relaxed'>
          Professional grooming delivered to your doorstep. Select a category to begin.
        </p>
      </div>

      {/* 2. Category Chips Section */}
      <div className='flex flex-wrap justify-center gap-2 mb-12 px-4 max-w-4xl mx-auto'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Services Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* CASE 1: Agar backend se loading ho rahi hai, toh inline skeleton dikhao */}
        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-full bg-[#1a1a1a] rounded-[2.5rem] p-4 border border-white/5 shadow-xl animate-pulse">
                {/* Image Box */}
                <div className="w-full h-52 md:h-60 rounded-[2rem] bg-zinc-800" />
                {/* Info Text Area */}
                <div className="px-2 py-6">
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-7 bg-zinc-800 rounded-md w-1/2" />
                    <div className="h-5 bg-zinc-800 rounded-md w-1/4" />
                  </div>
                  <div className="space-y-2 mb-8">
                    <div className="h-4 bg-zinc-800 rounded-md w-full" />
                    <div className="h-4 bg-zinc-800 rounded-md w-4/5" />
                  </div>
                  {/* Button bar */}
                  <div className="w-full h-14 bg-zinc-800 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : 
        
        /* CASE 2: Agar data successfully aa gaya hai */
        serviceData && serviceData.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10'>
            {serviceData
              .filter(item => activeCategory === "All" || item.category === activeCategory)
              .map((item, index) => (
                <div key={item._id || index} className="flex justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ServiceComponent item={item} />
                </div>
            ))}
          </div>
        ) : (
          
          /* CASE 3: Loading khatam aur array bilkul khali hai */
          <div className='text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/5 mx-4'>
            <p className='text-gray-500 font-medium'>No services available in this category yet.</p>
            <button 
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-amber-500 text-sm font-bold underline underline-offset-4"
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;