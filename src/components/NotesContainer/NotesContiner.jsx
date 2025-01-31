import { useState, useEffect } from 'react';
import { getAllNotes } from "../../utils/Api";
import "./NotesContainer.scss";
import NoteCard from "../NoteCard/NoteCard";
import AddNote from "../AddNote/AddNote";
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

    const handleCloseSnackBar = () => setOpen({
        isOpen: false,
        message: ""
    });

    useEffect(() => {
        getAllNotes("notes", userEmail)
            .then((response) => {
                if (response.data.status !== 200)
                    setOpen({
                        isOpen: true,
                        message: response.data.message
                    })
                setNotesList(response?.data?.data);
            })
            .catch((error) => {
                setOpen({
                    isOpen: true,
                    message: error.data.message
                })
                console.log(error);
            })
    }, []);


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

    const handleUpdateList = (action, data) => {
        
        if (action === "addNote") {
            setNotesList([
                ...notesList,
                data
            ]);
            return;
        }

        if (action === "archive" || action === "trash") {
            const newNoteList = notesList.filter((value) => data?.noteId !== value?.noteId);
            setNotesList(newNoteList);
            return;
        }

        if(action === "color" || action === "edit"){

            const newNoteList = notesList.filter((value) => value.noteId !== data.noteId);
            setNotesList([
                ...newNoteList,
                data
            ]);
        }
    }

    return (
        <div className="notes-container">
            <div className="notes-add-note">
                <AddNote handleUpdateList={handleUpdateList} />
            </div>
            <div className="notes-body-container">
                {notesList && notesList.map((data) => (
                    <NoteCard
                        key={data.noteId}
                        noteDetails={data}
                        container={"notes"}
                        handleUpdateList={handleUpdateList}
                    />
                ))
                }
            </div>
            <Snackbar
                open={open.isOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackBar}
                message={open.message}
                action={action}
            />
        </div>
    )
}

export default NotesContainer;

