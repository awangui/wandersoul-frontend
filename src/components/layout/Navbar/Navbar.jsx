import "./Navbar.css";
import  React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <div className="logo">
                    <h4>Wander<span>Soul</span></h4>
                </div>
                <div className="nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
                    <NavLink to="/destinations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Destinations</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>About</NavLink>
                    <NavLink to="/guides" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Guides</NavLink>
                </div>
                <div className="links">
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Profile</NavLink>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink>
                            <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>Sign Up</NavLink>
                        </>
                    )}
                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
