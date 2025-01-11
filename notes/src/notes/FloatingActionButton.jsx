import React, { useState } from "react";
import { Link } from "react-router-dom";
// import PlusPNG from '../../public/add.png';
// import PlusGIF from '../../public/add.gif';

const FloatingActionButton = () => {
    const [iconSrc, setIconSrc] = useState("/add.png"); // Default to PNG

    return (
        <Link
            to="/create"
            className="floating-button"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "clamp(50px, 5vw, 70px)", // Responsive size
                height: "clamp(50px, 5vw, 70px)", // Responsive size
                borderRadius: "50%",
                overflow: "hidden", // Ensures the image stays within the button
                zIndex: 1000,
                transition: "transform 0.3s ease",
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#005f73", // Default button background
            }}
            onMouseOver={() => setIconSrc("/add.gif")} // Change to GIF on hover
            onMouseOut={() => setIconSrc("/add.png")} // Change back to PNG on hover out
        >
            <img
                src={iconSrc}
                alt="Add Note"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Ensures the image scales properly
                }}
            />
        </Link>
    );
};

export default FloatingActionButton;
