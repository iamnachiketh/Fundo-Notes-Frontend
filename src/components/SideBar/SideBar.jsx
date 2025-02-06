import { useNavigate } from "react-router-dom";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./SideBar.scss";

function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        <LightbulbOutlinedIcon
          className="sidebar-icon"
          onClick={() => navigate("/home/notes")}
          data-testid="lightbulb-icon"
        />
        <NotificationsNoneOutlinedIcon
          className="sidebar-icon"
          data-testid="notifications-icon"
        />
        <EditOutlinedIcon
          className="sidebar-icon"
          data-testid="edit-icon"
        />
        <ArchiveOutlinedIcon
          className="sidebar-icon"
          onClick={() => navigate("/home/archive")}
          data-testid="archive-icon"
        />
        <DeleteOutlineOutlinedIcon
          className="sidebar-icon"
          onClick={() => navigate("/home/trash")}
          data-testid="delete-icon"
        />
      </div>
    </div>
  );
}

export default SideBar;