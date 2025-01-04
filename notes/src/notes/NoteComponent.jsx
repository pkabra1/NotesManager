import { React, useState, useEffect } from "react";
import { getAllNotes } from "../components/api/ApiService";
import { Link, useLocation } from "react-router-dom";
import { grid } from 'ldrs'
import NoteCard from "./NoteCard";

function NoteComponent() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    grid.register();

    useEffect(() => {
        getNotes();
    }, [location]); // Re-fetch when location changes

    async function getNotes() {
        setLoading(true);
        try {
            const response = await getAllNotes();
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    }

    function getLastModified(lastModified) {
        const date = new Date(lastModified);
        const now = new Date();
        const timeDifference = now - date;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference > 0 ? `${daysDifference} days ago` : 'Today';
    }

    if (loading) {
        return <div className="text-center mt-5">
            <l-grid
                size="60"
                speed="1.5"
                color="black"
            ></l-grid>
        </div>
    }


    return (
        <div className="container">
            {/* {notes.length === 0 ? (
                <div className="text-center mt-5">No notes found</div>
            ) : (
                notes.map((note) => (
                    <div class="card m-4">
                        <div class="card-header fs-5 fw-bold" style={titleStyle}>
                            {note.title}
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0 font-100">
                                <p className="font-monospace fs-6">{note.content}</p>
                                <footer className="blockquote-footer fs-6"><cite title="Source Title">{getLastModified(note.lastModified)}</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                ))
            )}

            <div className="text-center">
                <Link to="/create" className="btn btn-primary mt-5">
                    Create New Note
                </Link>
            </div> */}
            {notes.length === 0 ? (
                <div className="text-center mt-5">No notes found</div>
            ) : (
                notes.map((note) => (
                    <NoteCard
                        title={note.title}
                        content={note.content}
                        lastModified={getLastModified(note.lastModified)}
                    />
                ))
            )}
            <div className="text-center">
                <Link to="/create" className="btn btn-primary mt-5">
                    Create New Note
                </Link>
            </div>
        </div>

    );
}

export default NoteComponent;