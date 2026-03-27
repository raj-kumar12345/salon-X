import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setServices } from "./features/serviceSlice";
import { axiosInstance } from "./config/axiosInstance";

const ServiceSection = () => {
  const dispatch = useDispatch();
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
              setLoaded(true); // data loaded, no need to fetch again
            }
          } catch (err) {
            console.log(err);
          }
        }
      },
      { threshold: 0.3 } // jab 30% section viewport me dikhai de
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [dispatch, loaded]);

  return (
    <div ref={sectionRef}>
      {/* Yahan tu service cards ya component render kar */}
      <h2>Our Services</h2>
    </div>
  );
};

export default ServiceSection;