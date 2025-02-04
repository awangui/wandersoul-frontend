import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config";
fetch(`${API_BASE_URL}/guides`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
const Guides = () => {
    const [guides, setGuides] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE_URL}/guides`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch guides");
            }
            return response.json();
          })
          .then((data) => {
            if (data.guides && Array.isArray(data.guides)) {
              setGuides(data.guides);
            } else {
              throw new Error("Fetched data does not contain guides array");
            }
          })
          .catch((error) => console.error(error));
      }, []);
    return (
        <div className="container">
            <h1>Guides</h1>
            <div className="card-grid row">
                {guides.map((guide) => (
                    <div className="card" key={guide.id}>
                        {/* <img
                            src={guide.image}
                            alt={guide.name}
                            className="card-image"
                        /> */}
                        <div className="card-content">
                            <h3>{guide.name}</h3>
                            <p>{guide.bio}</p>
                            <p>{guide.languages}</p>
                            <p>{guide.contact_info}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

export default Guides;