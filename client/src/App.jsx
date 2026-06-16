import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Service from "./pages/Service";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Footer from "./pages/Footer";
import { axiosInstance } from "./config/axiosInstance";
import { setUser } from "./features/userSlice";
import { setServices } from "./features/serviceSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const serviceResponse = await axiosInstance.get("/service");
        if (serviceResponse.data?.success && serviceResponse.data?.services) {
          dispatch(setServices(serviceResponse.data.services));
        }
        
        // Fetch current user
        const userResponse = await axiosInstance.get("/auth/current-user");
        if (userResponse.data?.user) {
          dispatch(setUser(userResponse.data.user));
        }

      } catch (error) {
        // FIXED: Safe error diagnostics block
        console.error("--- Frontend Network Error Summary ---");
        if (error.response) {
          console.error("Server Responded With Error Code:", error.response.status);
          console.error("Payload details:", error.response.data);
        } else if (error.request) {
          console.error("The request was initiated, but no response caught. Check CORS policies or if backend server is live on Port 3000.");
        } else {
          console.error("Configuration Setup Error:", error.message);
        }
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
        <Home />
        <Service />
        <Appointment />
        <About />
        <Footer />
    </div>
  );
};

export default App;