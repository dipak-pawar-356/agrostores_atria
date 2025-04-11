import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pages/nursery.css";

export const Nurseries = () => {
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    // Fetch nurseries data from the backend
    fetch("/api/nurseries")
      .then((res) => res.json())
      .then((data) => setNurseries(data.nurseries))
      .catch((error) => console.error("Error fetching nurseries:", error));
  }, []);

  return (
    <div className="nursery-page">
      <h1>Nurseries</h1>
      <div className="nursery-list">
        {nurseries.length === 0 ? (
          <p>No Nurseries Found</p>
        ) : (
          nurseries.map((nursery) => (
            <div key={nursery._id} className="nursery-card">
              <h2>{nursery.name}</h2>
              <p><strong>Location:</strong> {nursery.location}</p>
              <p><strong>Rating:</strong> {nursery.rating} ⭐</p>
              <h3>Products:</h3>
              <ul>
                {nursery.products.map((product, index) => (
                  <li key={index}>
                    <strong>{product.productName}</strong> - ₹{product.price} ({product.quality} Quality)
                  </li>
                ))}
              </ul>
              {/* Add the Link here */}
              <Link to={`/nurseries/${nursery._id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};