import "./Home.scss";
import SideBar from "../../components/SideBar/SideBar";
import Dashboard from "../../components/Dashboard/Dashboard";
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
