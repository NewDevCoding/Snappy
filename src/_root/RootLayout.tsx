import Topbar from "C:/Users/isaac/Desktop/Snappy/src/components/shared/Topbar.tsx" 
import Bottombar from "C:/Users/isaac/Desktop/Snappy/src/components/shared/Bottombar"
import { Outlet } from "react-router-dom"
import LeftSidebar from "C:/Users/isaac/Desktop/Snappy/src/components/shared/LeftSidebar"

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full ">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout