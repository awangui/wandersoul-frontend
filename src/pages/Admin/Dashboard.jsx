import SideNav from "./SideNav";
import './Admin.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <SideNav />
            <div className="content">
                <h2>Dashboard</h2>
                <p>Admin Dashboard</p>
            </div>
        </div>
    );
}
export default Dashboard;