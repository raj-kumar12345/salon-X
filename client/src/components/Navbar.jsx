import { NavLink, useNavigate } from "react-router"; 
import { FaUserCircle, FaCut } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"; 
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/service" },
    { name: "Appointments", path: "/appointment" },
    { name: "About", path: "/about" },
  ];

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-amber-500 font-bold border-b-2 border-amber-500 pb-1 transition-all duration-300"
      : "text-white/90 hover:text-amber-400 transition-all duration-300 font-medium";

  return (
    // Changed bg to a slightly darker solid/glass mix and bumped z-index to 100
    <nav className="fixed top-0 w-full z-[100] bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => { navigate("/"); setIsOpen(false); }} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-amber-500 p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <FaCut className="text-black text-xl md:text-2xl" />
            </div>
            <span className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase">
              Salon<span className="text-amber-500">X</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={activeStyle}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-5">
            {user && (
              <NavLink to="/profile" className="text-white hover:text-amber-500 transition-colors">
                <FaUserCircle className="text-2xl" />
              </NavLink>
            )}
            <button
              onClick={() => navigate("/register-barber")}
              className="bg-amber-500 text-black px-6 py-2.5 rounded-full font-bold transition-all duration-300 text-sm hover:bg-amber-600 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
            >
              Join as Barber
            </button>
          </div>

          {/* Mobile Menu Button - High Visibility */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="text-white p-2 bg-white/5 rounded-lg border border-white/10 active:bg-amber-500 active:text-black transition-all"
            >
              {isOpen ? <RiCloseLine size={28} /> : <RiMenu3Line size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Higher Z and Darker Backdrop */}
      <div
        className={`fixed inset-0 top-[80px] h-[calc(100vh-80px)] bg-black/98 backdrop-blur-3xl md:hidden transition-all duration-500 transform ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } z-[99]`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10 pb-20 px-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={toggleMenu}
              className={({ isActive }) => 
                `text-3xl font-black transition-colors ${isActive ? "text-amber-500" : "text-white"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <div className="w-20 h-[2px] bg-amber-500/30 rounded-full" />

          {user && (
            <NavLink to="/profile" onClick={toggleMenu} className="text-xl text-white flex items-center gap-3 bg-white/5 px-8 py-3 rounded-2xl border border-white/10">
              <FaUserCircle className="text-amber-500" /> My Account
            </NavLink>
          )}

          <button
            onClick={() => {
              navigate("/register-barber");
              toggleMenu();
            }}
            className="w-full max-w-xs bg-amber-500 text-black py-4 rounded-2xl font-black text-lg shadow-xl shadow-amber-500/20"
          >
            Register as Barber
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;