import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NoteComponent from "./NoteComponent";
import NewNote from "./NewNote";
import Navbar from "./Navbar";
// import backgroundImage from '../resources/53899.png';
// import NoteCard from "./NoteCard";
import App from "./NoteCard";

export default function NotesApp() {
  return (
    <Router>
      <div style={{
        position: 'relative',
        minHeight: '100vh'  // This ensures the container takes up full viewport height
      }}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // backgroundImage: `url(${backgroundImage})`,
          background: "#003641",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
          opacity: 1  // Adjust this if you want the background to be more transparent
        }} />

        <Navbar />
        <div className="d-flex">
          <div className="container p-4">
            <Routes>
              {/* <Route path="/notes" element={<NoteComponent />}></Route> */}
              <Route path="/notes" element={<App />}></Route>
              <Route path="/create" element={<NewNote />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}