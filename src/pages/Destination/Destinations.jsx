import React, { useEffect, useState } from "react";
import "./Destinations.css"; 
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5555";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
     const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/destinations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        return response.json();
      })
      .then((data) => {
        if (data.destinations && Array.isArray(data.destinations)) {
          setDestinations(data.destinations);
        } else {
          throw new Error("Fetched data does not contain destinations array");
        }
      })
      .catch((error) => console.error(error));
  }, []);
 
  function getDestination(id) {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/destinations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',  // Include credentials
    })
      .then((data) => {
        if (data) {
          window.location.href = `/destinations/${id}`;
        } else {
          throw new Error("Destination not found");
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <h1>Destinations</h1>
      <div className="card-grid row">
        {destinations.map((destination) => (
          <div className="card" key={destination.id} onClick={() => getDestination(destination.id)}>
            <img
              src={destination.image}
              alt={destination.name}
              className="card-image"
            />
            <div className="card-content">
              <h2>{destination.name}</h2>
              <p>{destination.location}</p>
              <span className="tag">{destination.category}</span>
              <span className="tag">
                Safety Rating: {destination.safety_rating}
              </span>

              <p>{destination.activities}</p>
              <p>{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
