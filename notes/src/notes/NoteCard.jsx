import { Card, Button } from "react-bootstrap";
import { React, useState, useEffect } from "react";
import { deleteUserNote, getAllNotes } from "../components/api/ApiService";
import { Link, useLocation } from "react-router-dom";
import { grid } from 'ldrs'

const NoteCard = ({ id, title, content, lastModified, onDelete }) => {
    // const handleDelete = () => {
    //     try {
    //         deleteUserNote(id);
    //         console.log("It is hitting handle delete");
    //         getAllNotes(); // Refresh the notes after deletion
    //     } catch (error) {
    //         console.error("Error deleting note:", error);
    //     }
    // };
    const handleDelete = async () => {
        try {
            await deleteUserNote(id);
            console.log("Note deleted successfully with id: ", id);
            onDelete(id); // Notify the parent to update state
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };
    return (
        <Card
            style={{
                width: "100%",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: "15px", // Adds spacing between cards
                background: "#94d2bd",
                padding: "10px", // Reduces padding inside the card
            }}
        >
            <Card.Header
                className="text-white fw-bold fs-5"
                style={{
                    // background: "linear-gradient(90deg, #4b6cb7, #182848)",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    background: "#005f73",
                    padding: "8px 15px", // Decrease header padding
                }}
            >
                {title || "Untitled Note"}
            </Card.Header>
            <Card.Body style={{ padding: "10px 15px" }}>
                <Card.Text className="text-muted fs-6 mb-2" style={{ fontStyle: "italic" }}>
                    {content || "No content available for this note."}
                </Card.Text>
                <footer className="blockquote-footer text-end mb-1">
                    <small>
                        Last modified: <cite>{lastModified || "Not specified"}</cite>
                    </small>
                </footer>
            </Card.Body>
            <Card.Footer
                className="d-flex justify-content-end gap-2"
                style={{
                    padding: "8px 15px", // Reduce footer padding
                }}
            >
                <Button variant="primary" size="sm" style={{ borderRadius: "8px" }}>
                    Edit
                </Button>

                <Button variant="danger" size="sm" style={{ borderRadius: "8px" }} onClick={handleDelete}>
                    Delete
                </Button>

            </Card.Footer>
        </Card>
    );
};

function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    grid.register();

    useEffect(() => {
        getNotes();
    }, [location]);

    async function getNotes() {
        setLoading(true);
        try {
            const response = await getAllNotes();
            console.log(response.data);
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

    const handleDeleteFromParent = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

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
        <div className="container mt-4">
            {notes.map((note) => (
                <NoteCard
                    id={note.id}
                    title={note.title}
                    content={note.content}
                    lastModified={getLastModified(note.lastModified)}
                    onDelete={handleDeleteFromParent}
                />
            ))}
            <div className="text-center">
                <Link to="/create" className="btn btn-primary mt-5">
                    Create New Note
                </Link>
            </div>
        </div>
    );
};

export default App;
