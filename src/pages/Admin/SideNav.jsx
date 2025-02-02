import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';

const SideNav = () => {
    return (
        <nav className="side-nav flex-column bg-light border-right">
            <ul>
                <li className="nav-link active" aria-current="page" href="#">Dashboard</li>
                <li className="nav-link" href="#">Users</li>
                <li className="nav-link" href="#">Destinations</li>
                <li className="nav-link" href="#">Guides</li>
                <li className="nav-link" href="#">Reports</li>
            </ul>
        </nav>
    );
}

export default SideNav;
