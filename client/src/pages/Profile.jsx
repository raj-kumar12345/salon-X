import React from "react";
import { useSelector } from "react-redux";
import { FiUser, FiPhone, FiMail, FiEdit2 } from "react-icons/fi";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen  w-full bg-[#0a0a0a] flex items-center justify-center text-white px-4 pt-25 pb-10">
      
      {/* Container: Removed fixed width for max-width with padding safety */}
      <div className="bg-white/5 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/10 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Header & Avatar Placeholder */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
              <span className="text-3xl md:text-4xl font-black text-black">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              My <span className="text-amber-500">Profile</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1 font-bold">Account Details</p>
          </div>

          {user ? (
            <div className="space-y-5">
              
              {/* Name Field */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <FiUser size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">Full Name</p>
                  <p className="text-sm md:text-base font-bold truncate">{user.name}</p>
                </div>
              </div>

              {/* Mobile Field */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <FiPhone size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">Mobile Number</p>
                  <p className="text-sm md:text-base font-bold truncate">{user.mobile}</p>
                </div>
              </div>

              {/* Email Field - Handles long emails on 350px screens */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <FiMail size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">Email Address</p>
                  <p className="text-sm md:text-base font-bold truncate">{user.email}</p>
                </div>
              </div>

              {/* Edit Button Placeholder */}
              <button className="w-full mt-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
                <FiEdit2 className="group-hover:text-amber-500 transition-colors" /> Edit Profile
              </button>

            </div>
          ) : (
            <div className="text-center py-10">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full mb-4"></div>
                <p className="text-gray-500 text-sm">Session expired. Please log in again.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;