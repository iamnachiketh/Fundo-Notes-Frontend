import { useState, useEffect } from 'react';
import { getAllNotes } from "../../utils/Api";
import "./NotesContainer.scss";
import NoteCard from "../NoteCard/NoteCard";
import NoteBar from "../NoteBar/NoteBar";

function NotesContainer() {

    let userEmail = localStorage.getItem("userEmail");

    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        getAllNotes("notes", userEmail)
            .then((response) => {
                setNotesList(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div className="notes-container">
            <div className="notes-add-note">
                <NoteBar userEmail={userEmail} />
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

