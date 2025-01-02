import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteComponent from "./NoteComponent";
import NewNote from "./NewNote";

export default function NotesApp() {
  return (
    <Router>
      <div className="d-flex">
        <div className="container p-4">
          <Routes>
            <Route path="/notes" element={<NoteComponent />}></Route>
            <Route path="/create" element={<NewNote />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}