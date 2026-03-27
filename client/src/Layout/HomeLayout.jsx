import { Outlet } from "react-router"
import Navbar from "../components/Navbar"


const HomeLayout = () => {


  return (
    <div className="min-h-screen w-full relative" >
        <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
        </div>

        <div className="pt-0">
            <Outlet />
        </div>

    </div>
  )
}

export default HomeLayout