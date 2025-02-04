import React, { useEffect, useState } from "react";
import './Admin.css';
import SideNav from "./SideNav";
import API_BASE_URL from "../../config";

const AdminGuides = () => {
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${API_BASE_URL}/admin/guides`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch guides");
            }
            return response.json();
        })
        .then((data) => {
            if (data.guides && Array.isArray(data.guides)) {
                const formattedGuides = data.guides.map(guide => ({
                    id: guide.id,
                    name: guide.name,
                    image: guide.image,
                    bio: guide.bio,
                    location: guide.location,
                    languages: guide.languages,
                    contact_info: guide.contact_info,
                }));
                formattedGuides.sort((a, b) => a.name.localeCompare(b.name));
                setGuides(formattedGuides);
            } else {
                throw new Error("Fetched data does not contain guides array");
            }
        })
        .catch((error) => console.error(error));
    }, []);

    return (
        <div className="dashboard">
            <SideNav />
            <div className="content">
                <div className="guides-container">
                    <table className="guides-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Bio</th>
                                <th>Location</th>
                                <th>Languages</th>
                                <th>Contact Info</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guides.map((guide) => (
                                <tr key={guide.id}>
                                    <td>{guide.id}</td>
                                    <td>{guide.name}</td>
                                    <td>{guide.description}</td>
                                    <td><img src={guide.image} alt={guide.name} className="guide-image" /></td>
                                    <td>{guide.bio}</td>
                                    <td>{guide.location}</td>
                                    <td>{guide.languages}</td>
                                    <td>{guide.contact_info}</td>
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

export default AdminGuides;