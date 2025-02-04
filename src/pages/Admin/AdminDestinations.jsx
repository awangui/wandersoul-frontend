import React, { useEffect, useState } from "react";
import './Admin.css';
import SideNav from "./SideNav";
import API_BASE_URL from "../../config";

const AdminDestinations = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${API_BASE_URL}/admin/destinations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch destinations");
            }
            return response.json();
        })
        .then((data) => {
            if (data.destinations && Array.isArray(data.destinations)) {
                const formattedDestinations = data.destinations.map(destination => ({
                    id: destination.id,
                    image: destination.image,
                    name: destination.name,
                    location: destination.location,
                    description: destination.description,
                }));
                formattedDestinations.sort((a, b) => a.name.localeCompare(b.name));
                setDestinations(formattedDestinations);
            } else {
                throw new Error("Fetched data does not contain destinations array");
            }
        })
        .catch((error) => console.error(error));
    }, []);

    return (
        <div className="dashboard">
            <SideNav />
            <div className="content">
                <div className="destinations-container">
                    <table className="destinations-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {destinations.map((destination) => (
                                <tr key={destination.id}>
                                    <td>{destination.id}</td>
                                    <td><img src={destination.image} alt={destination.name} className="destination-image" /></td>
                                    <td>{destination.name}</td>
                                    <td>{destination.location}</td>
                                    <td>{destination.description}</td>
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

export default AdminDestinations;