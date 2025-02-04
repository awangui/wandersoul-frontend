import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
    return (
        <nav className="side-nav flex-column border-right">
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} exact to="/admin">Dashboard</NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/admin/users">Users</NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/admin/destinations">Destinations</NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/admin/guides">Guides</NavLink>
            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/reports">Reports</NavLink>
        </nav>
    );
}

export default SideNav;
