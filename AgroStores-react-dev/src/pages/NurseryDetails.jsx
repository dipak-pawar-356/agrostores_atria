import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/pages/nursery.css";

export const NurseryDetails = () => {
  const { id } = useParams(); // Get the nursery ID from the URL
  const [nursery, setNursery] = useState(null);

  useEffect(() => {
    // Fetch nursery details from the backend
    fetch(`/api/nurseries/${id}`)
      .then((res) => res.json())
      .then((data) => setNursery(data.nursery))
      .catch((error) => console.error("Error fetching nursery details:", error));
  }, [id]);

  if (!nursery) {
    return <p>Loading...</p>;
  }

  return (
    <div className="nursery-details">
      <h1>{nursery.name}</h1>
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
    </div>
  );
};