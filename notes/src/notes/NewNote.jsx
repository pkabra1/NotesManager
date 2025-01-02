import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../components/api/ApiService";

export default function NewNote() {
    const [title, setTitle] = useState("Title");
    const [content, setContent] = useState("Enter your content here");
    const navigate = useNavigate();
    // const [note, setNote] = useState({ title: "", content: "", lastModified: new Date().toISOString(), userId: 1001 });
    const [message, setMessage] = useState("");

    function handleOnChangeContent(event) {
        setContent(event.target.value);
    }
    function handleOnChangeTitle(event) {
        setTitle(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent page reload
    
        // Create the note object directly
        const newNote = {
            title: title,
            content: content,
            lastModified: new Date().toISOString(),
            userId: 1001,
        };
    
        console.log("New Note: ", newNote);
    
        // Call the addNote API with the newNote object
        addNote(newNote)
            .then((response) => {
                console.log("Note added successfully");
                setMessage(response.data); // Update the message state with the API response
                navigate("/notes"); // Navigate to the notes page
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(message);
    }
    

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="col-md-4">
                <h1>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={handleOnChangeTitle}
                        required
                    />
                </h1>
            </div>
            <div className="mb-3">
                <textarea
                    className="form-control"
                    value={content}
                    onChange={handleOnChangeContent}
                    style={{
                        backgroundColor: "#D3D3D3",
                        color: "black",
                    }}
                    id="myBox"
                    rows="8"
                ></textarea>
            </div>
            <div className="col-12">
                <button className="btn btn-primary" type="submit">
                    Submit form
                </button>
            </div>
        </form>
    );
}
