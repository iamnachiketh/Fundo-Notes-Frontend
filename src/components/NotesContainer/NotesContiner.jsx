import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { getAllNotes } from "../../utils/Api";
import { customAlphabet } from "nanoid";
import "./NotesContainer.scss";
import PaletteIcon from '@mui/icons-material/Palette';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupsIcon from '@mui/icons-material/Groups';
import ArchiveIcon from '@mui/icons-material/Archive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import NoteCard from "../NoteCard/NoteCard";

function NotesContainer() {

    const [isAddNote, setAddNote] = useState(false);

    const location = useLocation();

    let userEmail = location.state.userEmail;

    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        getAllNotes("notes", userEmail)
            .then((response) => {
                console.log(response);
                setNotesList(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },[isAddNote]);



    const handleAddNote = function () {

        setAddNote(false);
    }

    return (
        <div className="notes-container">
            <div className="notes-add-note">
            {!isAddNote ? (<div className="notes-add-note-bar" onClick={() => setAddNote(true)}>
                    <span>Take a note...</span>
                </div>) : (<div className="notes-add-note-inputs">
                    <input
                        type="text"
                        className="add-note-title"
                        placeholder="Title"
                    />
                    <textarea
                        type="text"
                        className="add-note-description"
                        placeholder="Take a note..."
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
                                onClick={() => { handleAddNote }}
                            >close</Button>
                        </div>
                    </div>
                </div>)}
            </div>
            <div className="notes-body-container">
                {
                    notesList.map((data) => (
                        <NoteCard key={data.noteId} noteDetails={data} container={"notes"} />
                    ))
                }
            </div>
        </div>
    )
}

export default NotesContainer;

