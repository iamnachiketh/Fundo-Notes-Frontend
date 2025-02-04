import { useState, useEffect } from "react"
import { getArchiveNotes } from "../../utils/Api";
import NoteCard from "../NoteCard/NoteCard";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import useDocTitle from "../../hooks/useDocTitle";
import "./ArchiveContainer.scss";


function ArchiveContainer() {

  useDocTitle("Archive");

  const [notesList, setNoteList] = useState([]);

  const [open, setOpen] = useState({
    isOpen: false,
    message: ""
  })

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    setLoading(true);

    getArchiveNotes("notes/archive/data")
      .then((response) => {
        if (response.data.status !== 200)
          setOpen({
            isOpen: true,
            message: response.data.message
          })
        setNoteList(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setOpen({
          isOpen: true,
          message: error.data.message
        })
        console.log(error);
      })
  }, []);


  const handleUpdateList = (action, data) => {
    if (action === "unarchive" || action === "trash") {
      const newNoteList = notesList.filter((value) => data.noteId !== value.noteId);
      setNoteList(newNoteList);
      return;
    }

    if(action === "color"){
      const newNoteList = notesList.filter((value) => data.noteId !== value.noteId);
      setNoteList([
        ...newNoteList,
        data
      ])
    }

  }

  const handleSnackBarClose = () => setOpen({
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
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="archive-container">
      {loading ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px"
      }}>
          <CircularProgress />
        </div>
      ):(<div className="archive-body-container">
        {notesList && notesList.map((data) => (
          <NoteCard key={data.noteId} noteDetails={data} container={"archive"} handleUpdateList={handleUpdateList} />
        ))
        }
      </div>)}
      <Snackbar
        open={open.isOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        message={open.message}
        action={action}
      />
    </div>
  )
}

export default ArchiveContainer
