import { useState, useEffect } from "react";
import { getTrashNotes } from "../../utils/Api";
import "./TrashContainer.scss";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import NoteCard from "../NoteCard/NoteCard";



function TrashContainer() {

  const [notesList, setNotesList] = useState([]);

  const [open, setOpen] = useState({
    isOpen: false,
    message: ""
  })

  useEffect(() => {
    getTrashNotes("notes/trash/data")
      .then((response) => {
        if(response.data.status!==200)
        setOpen({
          isOpen: true,
          message: response.data.message
        })
        setNotesList(response.data.data);
      })
      .catch((error) => {
        setOpen({
          isOpen: true,
          message: error.data.message
        })
        console.log(error);
      });
  }, [])

  const handleCloseSnackBar = () => setOpen({
    isOpen: false,
    message: ""
  });

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
      </IconButton>
    </>
  );

  return (
    <div className="trash-container">
      <div className="trash-body-container">
        {notesList && notesList.map((data) => (
          <NoteCard key={data.noteId} noteDetails={data} container={"trash"} />
        ))
        }
      </div>
      <Snackbar
        open={open.isOpen}
        autoHideDuration={2000}
        message={open.message}
        onClose={handleCloseSnackBar}
        action={action}
      />
    </div>
  )
}

export default TrashContainer
