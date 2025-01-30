import React, { useEffect, useState } from "react";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Replace with your backend server's address
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
