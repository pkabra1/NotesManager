import { React, useState, useEffect } from "react";
import { getAllNotes } from "../components/api/ApiService";
import { Link } from "react-router-dom";

function NoteComponent() {
    const [notes, setNotes] = useState([]);

    useEffect(() => { getNotes(); }, []);

    function getNotes() {
        getAllNotes()
            .then((response) => {
                console.log(response.data);
                setNotes(response.data);
            })
            .catch((error) => console.log(error));
    }

    function getLastModified(lastModified) {
        const date = new Date(lastModified);
        const now = new Date();

        const timeDifference = now - date;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference > 0 ? `${daysDifference} days ago` : 'Today';
    }
    return (
        <div className="container">
            {notes.map((note) => (
                <div className="card text-center m-2">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.content}</p>
                    </div>
                    <div className="card-footer text-muted">
                        {getLastModified(note.lastModified)}
                    </div>
                </div>
            ))}

            <div className="text-center">
                <Link to="/create" className="btn btn-primary mt-5 center">Create New Note</Link>
            </div>
        </div>
    );
}

export default NoteComponent;