import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from "../../config";
const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);  // Debugging: Check the token
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/destinations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',  
    })
      .then((response) => {
        console.log("Response status:", response.status);  // Debugging: Check the response status
        if (response.status === 401) {
          localStorage.removeItem("token");  // Clear the expired token
          navigate("/login");
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch destination");
        }
        return response.json();
      })
      .then((data) => {
        setDestination(data);
      })
      .catch((error) => {
        console.error("Error fetching destination:", error);
        navigate("/destinations");
      });
  }, [id, navigate]);

  if (!destination) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{destination.name}</h1>
      <p>{destination.description}</p>
    </div>
  );
};

export default DestinationDetail;