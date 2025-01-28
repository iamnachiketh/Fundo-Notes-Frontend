import { useState, useEffect } from "react"
import { getArchiveNotes } from "../../utils/Api";
import NoteCard from "../NoteCard/NoteCard";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./ArchiveContainer.scss";


function ArchiveContainer() {

  const [notesList, setNoteList] = useState([]);

  const [open, setOpen] = useState({
    isOpen: false,
    message: ""
  })


  useEffect(() => {
    getArchiveNotes("notes/archive/data")
      .then((response) => {
        setOpen({
          isOpen: true,
          message: response.data.message
        })
        setNoteList(response.data.data);
      })
      .catch((error) => {
        setOpen({
          isOpen: true,
          message: error.data.message
        })
        console.log(error);
      })
  }, []);

  const handleClose = () => setOpen({
    isOpen: false,
    message: ""
  });

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="archive-container">
      <div className="archive-body-container">
        {notesList && notesList.map((data) => (
          <NoteCard key={data.noteId} noteDetails={data} container={"archive"} />
        ))
        }
      </div>
      <Snackbar
        open={open.isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        message={open.message}
        action={action}
      />
    </div>
  )
}

export default ArchiveContainer
