import { useState, useEffect } from "react"
import { getArchiveNotes } from "../../utils/Api";
import NoteCard from "../NoteCard/NoteCard";
import "./ArchiveContainer.scss";
function ArchiveContainer() {

  const [notesList, setNoteList] = useState([]);

  useEffect(() => {
    getArchiveNotes("notes/archive/data")
      .then((response) => {
        console.log(response);
        setNoteList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <div className="archive-container">
      <div className="archive-body-container">
        {
          notesList.map((data) => (
            <NoteCard key={data.noteId} noteDetails={data} container={"archive"} />
          ))
        }
      </div>
    </div>
  )
}

export default ArchiveContainer
