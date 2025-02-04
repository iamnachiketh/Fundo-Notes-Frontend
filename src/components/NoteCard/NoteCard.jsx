import "./NoteCard.scss";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import Modal from '@mui/material/Modal';
import AddNote from "../AddNote/AddNote";
import * as Api from "../../utils/Api";

function NoteCard({ noteDetails, container, handleUpdateList, ...props }) {

  const navigate = useNavigate();

  const [anchorMoreEl, setAnchorMoreEl] = useState(null);

  const [anchorPaletteEl, setAnchorPaletteEl] = useState(null);

  const [searchParams] = useSearchParams();

  const noteId = searchParams.get("noteId");

  const [openModal, setOpenModal] = useState(noteId === noteDetails.noteId ? true : false);

  const openPalette = Boolean(anchorPaletteEl);

  const openMore = Boolean(anchorMoreEl);

  const handlePaletteClick = (event) => {
    setAnchorPaletteEl(event.currentTarget);
  };

  const handleMoreClick = (event) => {
    setAnchorMoreEl(event.currentTarget);
  };

  const handleMenuOpsAndClose = async (action) => {

    const errorCodeList = [404, 500];

    if (action === "trashNote") {
      const response = await Api.trashNote(`notes/${noteDetails.noteId}/trash`);

      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
      } else {
        console.log(response);
        handleUpdateList("trash", response.data.data);
      }

    }
    if (anchorMoreEl) setAnchorMoreEl(null);
  };

  const handleNoteIconsClick = async (action, data = "#ffffff") => {

    const errorCodeList = [404, 500, 403];

    if (action === "archive") {

      const response = await Api.setToArchiveNotes(
        `notes/${noteDetails.noteId}/archive`
      );
      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }
      console.log(response);

    } else if (action === "delete") {
      const response = await Api.permanentDelete(`notes/${noteDetails.noteId}/delete`);

      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }

      console.log(response);

    } else if (action === "restore") {
      const response = await Api.restoreNote(`notes/${noteDetails.noteId}/restore`);

      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }

      console.log(response);
    } else if (action === "unarchive") {
      const response = await Api.unarchiveNote(`notes/${noteDetails.noteId}/unarchive`);

      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }

      console.log(response);
    } else if (action === "color") {
      console.log(action);
      const response = await Api.updateColor(`notes/${noteDetails.noteId}/color`, data);

      if (errorCodeList.includes(response.data.status)) {
        console.log(response.data.message);
        return;
      }

      console.log(response);
    }

    if (anchorPaletteEl) setAnchorPaletteEl(null);

    handleUpdateList(action, action === "color" ? { ...noteDetails, color: data } : noteDetails);

  }

  return (
    <div
      className="note-wrapper"
      style={{ backgroundColor: noteDetails?.color }}
    >
      <p className="note-title" onClick={() => {
        navigate(`?noteId=${noteDetails.noteId}`)
        setOpenModal(true)
      }}>{noteDetails.title}</p>
      <p className="note-desc" onClick={() => {
        navigate(`?noteId=${noteDetails.noteId}`)
        setOpenModal(true)
      }}>{noteDetails.desc}</p>
      <div className="note-icons">
        {
          container === "trash" ? (
            <>
              <DeleteForeverIcon onClick={() => handleNoteIconsClick("delete")} titleAccess="delete" />
              <RestoreFromTrashIcon onClick={() => handleNoteIconsClick("restore")} titleAccess="restore" />
            </>
          ) : (
            <>
              <PaletteIcon
                id="basic-palette"
                aria-controls={open ? "basic-palette-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handlePaletteClick}
              />
              <Menu
                id="basic-palette-menu"
                anchorEl={anchorPaletteEl}
                open={openPalette}
                onClose={handleMenuOpsAndClose}
                MenuListProps={{ "aria-labelledby": "basic-palette" }}
              >
                <div className="color-palate-cnt">
                  <div className="col1" onClick={() => handleNoteIconsClick("color", '#FFFFFF')}></div>
                  <div className="col2" onClick={() => handleNoteIconsClick("color", '#FAAFA8')}></div>
                  <div className="col3" onClick={() => handleNoteIconsClick("color", '#F39F76')}></div>
                  <div className="col4" onClick={() => handleNoteIconsClick("color", '#FFF8B8')}></div>
                  <div className="col5" onClick={() => handleNoteIconsClick("color", '#E2F6D3')}></div>
                  <div className="col6" onClick={() => handleNoteIconsClick("color", '#B4DDD3')}></div>
                  <div className="col7" onClick={() => handleNoteIconsClick("color", '#D4E4ED')} ></div >
                  <div className="col8" onClick={() => handleNoteIconsClick("color", '#AECCDC')} ></div >
                  <div className="col9" onClick={() => handleNoteIconsClick("color", '#D3BFDB')} ></div >
                  <div className="col10" onClick={() => handleNoteIconsClick("color", '#F6E2DD')} ></div >
                  <div className="col11" onClick={() => handleNoteIconsClick("color", '#E9E3D4')} ></div >
                  <div className="col12" onClick={() => handleNoteIconsClick("color", '#EFEFF1')} ></div >
                </div>
              </Menu>
              <GroupsIcon />
              {container === "notes" && container !== "trash" ?
                <ArchiveIcon onClick={() => handleNoteIconsClick("archive")} titleAccess="Archive" /> :
                <UnarchiveIcon onClick={() => handleNoteIconsClick("unarchive")} titleAccess="UnArchive" />
              }
              <NotificationsIcon />
              <MoreVertIcon
                id="basic-more-icon"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMoreClick}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorMoreEl}
                open={openMore}
                onClose={handleMenuOpsAndClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-more-icon',
                }}
              >
                <MenuItem onClick={() => handleMenuOpsAndClose("trashNote")}>Delete Note</MenuItem>
                <MenuItem onClick={handleMenuOpsAndClose}>Add lable</MenuItem>
                <MenuItem onClick={handleMenuOpsAndClose}>Add drawing</MenuItem>
                <MenuItem onClick={handleMenuOpsAndClose}>Make a copy</MenuItem>
                <MenuItem onClick={handleMenuOpsAndClose}>Show checkboxes</MenuItem>
                <MenuItem onClick={handleMenuOpsAndClose}>Copy to Google Docs</MenuItem>
                <MenuItem onClick={handleMenuOpsAndClose}>Version history</MenuItem>
              </Menu>
            </>
          )
        }
      </div>
      {openModal && <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{
          display: "flex", 
          minHeight: "100vh", 
          alignItems: "center", 
          justifyContent: "center"
          }}>

          <AddNote
            handleUpdateList={handleUpdateList}
            editMode={true}
            noteDetails={noteDetails}
            setOpenModal={setOpenModal}
          />
        </div>

      </Modal>}
    </div>
  )
}

export default NoteCard
