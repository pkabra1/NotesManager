import React from 'react';
import { useLocation } from 'react-router-dom';
import NoteCard from './NoteCard'; // Import your existing NoteCard component

const SearchResults = () => {
    const location = useLocation();
    const { results, searchTerm } = location.state || { results: [], searchTerm: '' };

    return (
        <div className="container mt-4">
            <h2>Search Results for "{searchTerm}"</h2>
            {results.length === 0 ? (
                <div className="alert alert-info">
                    No notes found matching your search.
                </div>
            ) : (
                <>
                    <p>Found {results.length} matching notes</p>
                    {results.map((note) => (
                        <NoteCard
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            lastModified={note.lastModified}
                            onDelete={() => {/* handle delete */ }}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default SearchResults;