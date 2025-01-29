import "./Navbar.css";
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(){
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <div className="logo">
                    <h4>Wander<span>With</span></h4>
                </div>
                <div className="nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
                    <NavLink to="/destinations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Destinations</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>About</NavLink>
                    <NavLink to="/guide" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Guides</NavLink>
                </div>
                <div className="links">
                    <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink>
                    <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>Sign Up</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
