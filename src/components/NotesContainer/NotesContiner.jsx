import { useState, useEffect } from 'react';
import { getAllNotes } from "../../utils/Api";
import "./NotesContainer.scss";
import NoteCard from "../NoteCard/NoteCard";
import NoteBar from "../NoteBar/NoteBar";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function NotesContainer() {

    let userEmail = localStorage.getItem("userEmail");

    const [notesList, setNotesList] = useState([]);

    const [open, setOpen] = useState({
        isOpen: false,
        message: ""
    })


    useEffect(() => {
        getAllNotes("notes", userEmail)
            .then((response) => {
                setOpen({
                    isOpen: true,
                    message: response.data.message
                })
                setNotesList(response?.data?.data);
            })
            .catch((error) => {
                setOpen({
                    isOpen: true,
                    message: response.data.message
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
        <div className="notes-container">
            <div className="notes-add-note">
                <NoteBar userEmail={userEmail} />
            </div>
            <div className="notes-body-container">
                {notesList && notesList.map((data) => (
                    <NoteCard key={data.noteId} noteDetails={data} container={"notes"} />
                ))
                }
            </div>
            <Snackbar
                open={open.isOpen}
                autoHideDuration={10000}
                onClose={handleClose}
                message={open.message}
                action={action}
            />
        </div>
    )
}

export default NotesContainer;

