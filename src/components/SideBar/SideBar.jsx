import { useNavigate } from "react-router-dom";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';;
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./SideBar.scss";

function SideBar() {

  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <LightbulbOutlinedIcon className="sidebar-icon" onClick = {() => navigate("/home/notes")}/>
      <NotificationsNoneOutlinedIcon className="sidebar-icon" />
      <EditOutlinedIcon className="sidebar-icon" />
      <ArchiveOutlinedIcon className="sidebar-icon" onClick = {() => navigate("/home/archive")}/>
      <DeleteOutlineOutlinedIcon className="sidebar-icon" onClick={() => navigate("/home/trash")}/>
    </div>
  )
}

export default SideBar
