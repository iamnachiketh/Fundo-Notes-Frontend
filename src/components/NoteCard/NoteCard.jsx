import "./NoteCard.scss";
import PaletteIcon from '@mui/icons-material/Palette';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import ArchiveIcon from '@mui/icons-material/Archive';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Note({noteDetails, container,...props}) {
  return (
    <div className= "note-wrapper">
      <p className="note-title">{noteDetails?.title}</p>
      <p className="note-desc">{noteDetails?.desc}</p>
      <div className="note-icons">
        <PaletteIcon />
        <MoreVertIcon />
        <GroupsIcon />
        <ArchiveIcon />
        <NotificationsIcon />
      </div>
    </div>
  )
}

export default Note
