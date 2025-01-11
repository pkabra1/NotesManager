import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const CountGtZero = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <Link
                to="/create"
                className="btn btn-primary btn-lg shadow-lg px-4 py-3 position-relative create-note-btn"
                style={{
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                }}
            >
                <FaPlus style={{ fontSize: "1.5rem" }} />
            </Link>
        </div>
    );
}

const CountZero = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#003641" }}
        >
            <div
                className="card shadow-lg"
                style={{
                    width: "18rem",
                    borderRadius: "15px",
                    backgroundColor: "#005f73",
                    overflow: "hidden",
                    border: "none",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-5px)";
                    e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                }}
            >
                <div
                    className="card-body d-flex flex-column align-items-center justify-content-center"
                    style={{
                        backgroundColor: "#94d2bd",
                        padding: "20px",
                        height: "200px",
                    }}
                >
                    <div
                        className="icon-container mb-3"
                        style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#005f73",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <FaPlus style={{ color: "white", fontSize: "1.5rem" }} />
                    </div>
                    <Link
                        to="/create"
                        className="btn btn-light fw-bold text-dark mt-2"
                        style={{
                            backgroundColor: "#94d2bd",
                            border: "none",
                            fontSize: "1.2rem",
                            padding: "10px 20px",
                            borderRadius: "10px",
                        }}
                    >
                        Create New Note
                    </Link>
                </div>
            </div>
        </div>
    );
}

const CreateNoteCard = ({ count }) => {
    return count > 0 ? <CountGtZero /> : <CountZero />;
};

export default CreateNoteCard;
