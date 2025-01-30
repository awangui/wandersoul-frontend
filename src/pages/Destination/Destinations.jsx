import React, { useEffect, useState } from "react";
import "./Destinations.css"; // Import the CSS file for styling

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/destinations")
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

  return (
    <div className="container">
      <h1>Destinations</h1>
      <div className="card-grid row">
        {destinations.map((destination) => (
          <div className="card" key={destination.id}>
            <img src={destination.image} alt={destination.name} className="card-image" />
            <div className="card-content">
              <h2>{destination.name}</h2>
              <p>{destination.location}</p>
<span className="tag">{destination.category}</span> 
          <span className="tag">Safety Rating: {destination.safety_rating}</span>
             
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
