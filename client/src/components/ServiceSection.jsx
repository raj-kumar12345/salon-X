import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../features/serviceSlice";
import { axiosInstance } from "../config/axiosInstance";
import ServiceComponent from "./ServiceComponent";

const ServiceSection = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          try {
            const serviceRes = await axiosInstance.get("/service");
            if (serviceRes.data?.services) {
              dispatch(setServices(serviceRes.data.services));
              setLoaded(true);
            }
          } catch (err) {
            console.error("Lazy Load Section Failure:", err.message);
          }
        }
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [dispatch, loaded]);

  return (
    <div ref={sectionRef} className="py-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-white mb-8">Our Highlighted Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((item) => (
            <ServiceComponent key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;