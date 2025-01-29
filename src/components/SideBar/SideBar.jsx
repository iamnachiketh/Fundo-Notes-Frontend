import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import "./SideBar.scss";

function SideBar() {
  return (
    <div className="sidebar-container">
      <LightbulbIcon className="sidebar-icon" />
      <NotificationsIcon className="sidebar-icon"/> 
      <EditIcon className="sidebar-icon"/>
      <ArchiveIcon className="sidebar-icon"/>
      <DeleteIcon className="sidebar-icon"/>
    </div>
  )
}

export default SideBar
