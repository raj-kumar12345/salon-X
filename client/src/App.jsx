import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import About from "./pages/About"
import Appointment from "./pages/Appointment"
import Home from "./pages/Home"
import Service from "./pages/Service"
import { axiosInstance } from "./config/axiosInstance"
import { setUser } from "./features/userSlice";
import { setServices } from "./features/serviceSlice";
import Footer from "./pages/Footer";

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
      
      const fetchData = async () =>{
        try {

          // for service api
            const serviceResponse = await axiosInstance.get("/service");
            if(serviceResponse.data?.services){
                dispatch(setServices(serviceResponse.data.services))
            }
          // for current-user api
            const userResponse = await axiosInstance.get("/auth/current-user");
            if(userResponse.data?.user){
                dispatch(setUser(userResponse.data.user));
            }
            
  
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
  
      fetchData();
  
  },[dispatch])

  

  return (
    <div>
        <Home />
        <Service />
        <Appointment />
        <About />
        <Footer />
    </div>
  )
}

export default App