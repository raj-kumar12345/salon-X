import React, { useState } from 'react';
import ServiceComponent from '../components/ServiceComponent';
import { useSelector } from 'react-redux';

const Service = () => {
  const serviceData = useSelector((state) => state.service.services);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Haircut", "Beard", "Facial", "Massage", "Combo"];

  return (
    <div className='min-h-screen w-full bg-[#0a0a0a] pb-20 overflow-x-hidden'>
      
      {/* 1. Header Section - Tightened for 350px */}
      <div className='pt-28 md:pt-32 pb-8 px-4 text-center'>
        <h1 className='text-[32px] xs:text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter'>
          Our <span className='text-amber-500'>Services</span>
        </h1>
        <p className='text-gray-500 text-xs md:text-lg max-w-2xl mx-auto px-2 leading-relaxed'>
          Professional grooming delivered to your doorstep. Select a category to begin.
        </p>
      </div>

      {/* 2. Category Chips - Optimized for Tiny Screens */}
      

      {/* 3. Services Grid - 1 Column on 350px, Multi on Desktop */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {serviceData && serviceData.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10'>
            {serviceData
              .filter(item => activeCategory === "All" || item.category === activeCategory)
              .map((item, index) => (
                <div key={index} className="flex justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ServiceComponent item={item} />
                </div>
            ))}
          </div>
        ) : (
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