import { useState, useEffect, useContext } from 'react';
import { getAllNotes, searchNote } from "../../utils/Api";
import { SearchQueryContext } from "../Search/Search";
import useDocTitle from '../../hooks/useDocTitle';
import NoteCard from "../NoteCard/NoteCard";
import AddNote from "../AddNote/AddNote";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import "./NotesContainer.scss";

function NotesContainer() {

    useDocTitle("Notes");

    let userEmail = localStorage.getItem("userEmail");

    const [notesList, setNotesList] = useState([]);

    const [open, setOpen] = useState({
        isOpen: false,
        message: ""
    })

    const [loading, setLoad] = useState(true);

    const searchQuery = useContext(SearchQueryContext);

    const handleCloseSnackBar = () => setOpen({
        isOpen: false,
        message: ""
    });

    useEffect(() => {

        setLoad(true);

        getAllNotes("notes", userEmail)
            .then((response) => {
                if (response.data.status !== 200)
                    setOpen({
                        isOpen: true,
                        message: response.data.message
                    })
                setNotesList(response?.data?.data);
                setLoad(false);
            })
            .catch((error) => {
                setOpen({
                    isOpen: true,
                    message: error.data.message
                })
                console.log(error);
            })



    }, []);

    useEffect(() => {
        setLoad(true);

        searchNote("notes/note-search/search", searchQuery)
        .then((response) => {
            setLoad(false);
            if(response.data.data.length <= 0){
                setOpen({
                    isOpen: true,
                    message: "No such note"
                });
                setNotesList([]);
                return;
            }

            setNotesList(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })

    }, [searchQuery]);


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

        if (action === "color" || action === "edit") {

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
            {loading ? (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px"
                }}>
                    <CircularProgress />
                </div>
            ) : (<div className="notes-body-container">
                {notesList && notesList.map((data) => (
                    <NoteCard
                        key={data.noteId}
                        noteDetails={data}
                        container={"notes"}
                        handleUpdateList={handleUpdateList}
                    />
                ))}
            </div>)}
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

