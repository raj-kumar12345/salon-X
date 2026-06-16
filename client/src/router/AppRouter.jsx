import { createBrowserRouter, RouterProvider } from "react-router";
import Register from '../pages/Register';
import Login from '../pages/Login';
import VerifyOTP from "../pages/VerifyOTP";
import ForgetPassword from "../pages/ForgetPassword";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../pages/Home";
import Service from "../pages/Service";
import Appointment from "../pages/Appointment";
import About from "../pages/About";
import Profile from "../pages/Profile";
import App from "../App";
import ProtectedRoute from "../components/ProtectedRoute";
import RegisterAsBarber from "../pages/RegisterAsBarber";
import LoginAsBarber from "../pages/LoginAsBarber";
import BarberHome from "../pages/BarberHome";
import ResetPassword from "../pages/ResetPassword";

const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/register",
            element: <Register />   
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/verify-otp",
            element: <VerifyOTP />
        },
        {
            path:"/forget-password",
            element:<ForgetPassword />
        },
        {
            path: "/reset-password",
            element: <ResetPassword />
        },
        {
            path: "/",
            element: <HomeLayout />,
            children:[
                {
                    index: true,
                    element: <App />
                },
                {
                    path: "service",
                    element: <Service />
                },
                {
                    path: "appointment",
                    element: <ProtectedRoute />,
                    children: [
                        {
                            index: true,
                            element: <Appointment />
                        }
                    ]
                },
                {
                    path: "about",
                    element: <About />
                },
                {
                    path: "profile",
                    element: <ProtectedRoute />,
                    children: [
                        {
                            index: true,
                            element: <Profile />
                        }
                    ]
                    
                }
            ]
        },
        {
            path: "/register-barber",
            element: <RegisterAsBarber />   
        },
        {
            path: "/login-barber",
            element: <LoginAsBarber />   
        },
        {
            path: "/barber-home",
            element: <BarberHome />
        }
    ])


  return <RouterProvider router={router} />
}

export default AppRouter