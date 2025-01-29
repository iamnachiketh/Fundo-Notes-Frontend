import "./NoteCard.scss";
import { useState } from "react";
import PaletteIcon from '@mui/icons-material/Palette';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import ArchiveIcon from '@mui/icons-material/Archive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  setToArchiveNotes,
  permanentDelete,
  restoreNote,
  unarchiveNote
} from "../../utils/Api";


function Note({ noteDetails, container, handleUpdateList, ...props }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNoteIconsClick = async (action) => {

    const errorCodeList = [404, 500, 403];

    if (action === "archive") {

      const response = await setToArchiveNotes(
        `notes/${noteDetails.noteId}/archive`
      );
      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }
      console.log(response);

    } else if (action === "delete") {
      const response = await permanentDelete(`notes/${noteDetails.noteId}/delete`);

      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }

      console.log(response);

    } else if (action === "restore") {
      const response = await restoreNote(`notes/${noteDetails.noteId}/restore`);

      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }

      console.log(response);
    } else if (action === "unarchive") {
      const response = await unarchiveNote(`notes/${noteDetails.noteId}/unarchive`);

      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }

      console.log(response);
    }

    console.log(handleUpdateList);

    handleUpdateList(action, noteDetails);

  }

  return (
    <div className="note-wrapper">
      <p className="note-title">{noteDetails?.title}</p>
      <p className="note-desc">{noteDetails?.desc}</p>
      <div className="note-icons">
        {
          container === "trash" ? (
            <>
              <DeleteForeverIcon onClick={() => handleNoteIconsClick("delete")} />
              <RestoreFromTrashIcon onClick={() => handleNoteIconsClick("restore")} />
            </>
          ) : (
            <>
              <PaletteIcon />
              <GroupsIcon />
              {container === "notes" && container !== "trash" ?
                <ArchiveIcon onClick={() => handleNoteIconsClick("archive")} /> :
                <UnarchiveIcon onClick={() => handleNoteIconsClick("unarchive")} />
              }
              <NotificationsIcon />
              <MoreVertIcon
                id="basic-more-icon"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-more-icon',
                }}
              >
                <MenuItem onClick={handleClose}>Delete Note</MenuItem>
                <MenuItem onClick={handleClose}>Add lable</MenuItem>
                <MenuItem onClick={handleClose}>Add drawing</MenuItem>
                <MenuItem onClick={handleClose}>Make a copy</MenuItem>
                <MenuItem onClick={handleClose}>Show checkboxes</MenuItem>
                <MenuItem onClick={handleClose}>Copy to Google Docs</MenuItem>
                <MenuItem onClick={handleClose}>Version history</MenuItem>
              </Menu>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Note
