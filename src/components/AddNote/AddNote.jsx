import { useState } from "react";
import { customAlphabet } from "nanoid";
import { addNote } from "../../utils/Api";
import PaletteIcon from '@mui/icons-material/Palette';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import ArchiveIcon from '@mui/icons-material/Archive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./AddNote.scss";



function AddNote() {

    const [toggleBar, setToggleBar] = useState(false);

    const nanoid = customAlphabet("0123456789", 4);

    const [note, setNote] = useState({
        noteId: "",
        userEmail: "",
        title: "",
        desc: ""
    });

    const [open, setOpen] = useState({
        isOpen: false,
        message: ""
    })

    const handleAddNote = function () {

        if(!note.title.trim() || !note.desc.trim()){
            setOpen({
                isOpen: true,
                message: "Please enter title and description"
            });
            return;
        }

        const uniqueId = nanoid();

        const updateNote = {
            ...note,
            noteId: `NOTE${uniqueId}`,
            userEmail: localStorage.getItem("userEmail")
        }

        setToggleBar(false);

        addNote("notes", updateNote)
            .then((response) => {
                setOpen({
                    isOpen: true,
                    message: response.data.message
                })
                console.log(response);
            })
            .catch((error) => {
                setOpen({
                    isOpen: true,
                    message: error.data.message
                })
                console.log(error);
            })
    }

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
        <>
            {!toggleBar ? (<div className="notes-add-note-bar" onClick={() => setToggleBar(true)}>
                <span>Take a note...</span>
            </div>) : (<div className="notes-add-note-inputs">
                <input
                    type="text"
                    className="add-note-title"
                    placeholder="Title"
                    value={note.title}
                    onChange={(e) => setNote({
                        ...note,
                        title: e.target.value
                    })}
                />
                <textarea
                    type="text"
                    className="add-note-description"
                    placeholder="Take a note..."
                    value={note.desc}
                    onChange={(e) => setNote({
                        ...note,
                        desc: e.target.value
                    })}
                />
                <div className="notes-icon-button-div">
                    <div className="notes-icon-div">
                        <NotificationsIcon style={{
                            margin: "0 15px",
                            cursor: "pointer",
                            color: "gray"
                        }} />
                        <GroupsIcon style={{
                            margin: "0 15px",
                            cursor: "pointer",
                            color: "gray"
                        }} />
                        <PaletteIcon style={{
                            margin: "0 15px",
                            cursor: "pointer",
                            color: "gray"
                        }} />
                        <ArchiveIcon style={{
                            margin: "0 15px",
                            cursor: "pointer",
                            color: "gray"
                        }} />
                        <MoreVertIcon style={{
                            margin: "0 15px",
                            cursor: "pointer",
                            color: "gray"
                        }} />
                    </div>
                    <div className="note-button-div">
                        <Button
                            variant="text"
                            onClick={handleAddNote}
                        >close</Button>
                    </div>
                </div>
            </div>)}
            <Snackbar
                open={open.isOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                message={open.message}
                action={action}
            />
        </>
    )
}

export default AddNote;
