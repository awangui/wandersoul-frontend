import React, { useEffect, useState } from "react";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Replace with your backend server's address
    fetch("api/destinations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        return response.json();
      })
      .then((data) => setDestinations(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Destinations</h1>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.id}>
            <h2>{destination.name}</h2>
            <p>{destination.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
