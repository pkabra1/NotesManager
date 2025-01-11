import React, { useState } from 'react';
import { updateUserNote } from '../components/api/ApiService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UpdateNote = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get initial values from navigation state, or use empty strings as fallback
    const initialTitle = location.state?.title || '';
    const initialContent = location.state?.content || '';
    const noteId = location.state?.id || '';

    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [message, setMessage] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newNote = {
            noteId,
            title,
            content,
            lastModified: new Date().toISOString(),
            userId: user.id,
        };

        updateUserNote(newNote, noteId)
            .then((response) => {
                console.log("User id for this note is: ", user.id);
                console.log("Note added successfully: ", response.data);
                navigate("/notes");
            })
            .catch((error) => {
                console.log(error);
                setMessage('Failed to save note: ' + error.message);
            });
    };

    const handleReset = () => {
        setTitle('');
        setContent('');
        setMessage('');
    };

    const onCancel = () => {
        navigate("/notes");
    };

    return (
        <div className="container-fluid min-vh-100 py-4" style={{ backgroundColor: '#003641' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="card" style={{ backgroundColor: '#94d2bd' }}>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Enter title..."
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="form-control form-control-lg"
                                            style={{
                                                backgroundColor: '#005f73',
                                                color: 'white',
                                                border: '2px solid #003641',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                borderRadius: '4px'
                                            }}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="form-control"
                                            style={{
                                                backgroundColor: '#005f73',
                                                color: 'white',
                                                height: '300px'
                                            }}
                                            placeholder="Enter your content here..."
                                            required
                                        />
                                    </div>

                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-primary me-2">
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="btn btn-outline-primary me-2"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onCancel}
                                            className="btn btn-outline-primary"
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                    {message && (
                                        <div className="alert alert-danger mt-4" role="alert">
                                            {message}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateNote;