import React, { useEffect, useState } from "react";
import "./Users.css";
import './Admin.css';
import SideNav from "./SideNav";
import API_BASE_URL from "../../config";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fname: '',
        sname: '',
        email: '',
        role_id: 2,
        password: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const url = editMode ? `${API_BASE_URL}/admin/users/${editUserId}` : `${API_BASE_URL}/users`;
        const method = editMode ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(editMode ? "Failed to update user" : "Failed to create user");
            }
            return response.json();
        })
        .then((data) => {
            if (editMode) {
                setUsers(users.map(user => user.id === editUserId ? {
                    ...user,
                    name: `${data.fname} ${data.sname}`,
                    email: data.email,
                    role: data.role_id === 1 ? "Admin" : data.role_id === 2 ? "User" : data.role_id === 3 ? "Guide" : "Unknown",
                    date_joined: data.created_at
                } : user));
                alert("User updated successfully");
            } else {
                setUsers([...users, {
                    id: data.id,
                    name: `${data.fname} ${data.sname}`,
                    email: data.email,
                    role: data.role_id === 1 ? "Admin" : data.role_id === 2 ? "User" : data.role_id === 3 ? "Guide" : "Unknown",
                    date_joined: data.created_at
                }]);
                alert("User created successfully");
            }
            setShowForm(false);
            setFormData({
                fname: '',
                sname: '',
                email: '',
                role_id: 2,
                password: ''
            });
            setEditMode(false);
            setEditUserId(null);
        })
        .catch((error) => console.error(error));
    };

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

    const handleEdit = (id) => {
        const user = users.find(user => user.id === id);
        if (user) {
            setFormData({
                fname: user.name.split(' ')[0],
                sname: user.name.split(' ')[1],
                email: user.email,
                role_id: user.role === "Admin" ? 1 : user.role === "User" ? 2 : user.role === "Guide" ? 3 : 2,
                password: ''
            });
            setEditMode(true);
            setEditUserId(id);
            setShowForm(true);
        }
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
        fetch(`${API_BASE_URL}/admin/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            setUsers(users.filter(user => user.id !== id));
            alert("User deleted successfully");
        })
        .catch((error) => console.error(error));
    };

    return (
        <div className="dashboard">
            <SideNav />
            <div className="content">
                <div className="users-container">
                    <div className="add-user">
                        <button className="add-user-button btn" onClick={() => setShowForm(!showForm)}>
                            {showForm ? "Cancel" : "Add User"}
                        </button>
                        {showForm && (
                            <form className="user-form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="fname"
                                    placeholder="First Name"
                                    value={formData.fname}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="sname"
                                    placeholder="Surname"
                                    value={formData.sname}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <select
                                    name="role_id"
                                    value={formData.role_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value={1}>Admin</option>
                                    <option value={2}>User</option>
                                    <option value={3}>Guide</option>
                                </select>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required={!editMode}
                                />
                                <button type="submit" className="submit-button btn">Submit</button>
                            </form>
                        )}
                    </div>
                    <table>
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
                                        <button className="edit-button" onClick={() => handleEdit(user.id)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
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