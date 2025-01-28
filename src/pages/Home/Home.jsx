import "./Home.scss";
import Dashboard from "../../components/dashboard/Dashboard";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";


function Home() {
  return (
    <div className="home-container">
      <Dashboard />
      <div className="home-page-body">
        <SideBar />
        <Outlet/>
      </div>
    </div>
  )
}

export default Home;
