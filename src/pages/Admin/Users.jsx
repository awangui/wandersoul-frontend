import React, { useEffect, useState } from "react";
import "./Users.css";
import './Admin.css';
import SideNav from "./SideNav";
import API_BASE_URL from "../../config";
const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${API_BASE_URL}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json();
        })
        .then((data) => {
            if (data.users && Array.isArray(data.users)) {
                const formattedUsers = data.users.map(user => ({
                    id: user.id,
                    name: `${user.fname} ${user.sname}`,
                    email: user.email,
                    role: user.role_id === 1 ? "Admin" : user.role_id === 2 ? "User" : user.role_id === 3 ? "Guide" : "Unknown",
                    date_joined: user.created_at
                }));
                formattedUsers.sort((a, b) => a.name.localeCompare(b.name));
                setUsers(formattedUsers);
            } else {
                throw new Error("Fetched data does not contain users array");
            }
        })
        .catch((error) => console.error(error));
    }, []);
    return (
        <div className="dashboard">
            <SideNav />
        <div className="content">
        <div className="users-container">
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Date Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.date_joined}</td>
                            <td>
                                <button className="edit-button">Edit</button>
                                <button className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </div>
    );
};
export default Users;