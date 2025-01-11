import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    // Handle Login/Logout
    const handleAuthClick = () => {
        if (isAuthenticated) {
            // Handle logout
            logout(); // Call logout from AuthContext
            navigate('/login'); // Or any other route for logout
        } else {
            // Redirect to login page
            navigate('/login');
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav w-100">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/notes">
                            Notes
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li> */}
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="/"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Dropdown
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/">Action</Link></li>
                            <li><Link className="dropdown-item" to="/">Another action</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                        </ul>
                    </li>
                </ul>
                <form className="d-flex ms-auto">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
                <Link className="m-2" to="/login"><button className="btn btn-outline-success" type="submit" onClick={handleAuthClick}>
                    {isAuthenticated ? 'Logout' : 'Login'}
                </button></Link>
            </div>
        </nav>
    );
}

export default Navbar;