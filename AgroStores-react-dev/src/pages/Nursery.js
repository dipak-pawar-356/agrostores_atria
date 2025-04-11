// filepath: src/pages/Nursery.js
import { useEffect, useState } from "react";
import "../styles/pages/nursery.css";

export const Nursery = () => {
  const [nurseries, setNurseries] = useState([]);

  useEffect(() => {
    fetch("/api/nurseries")
      .then((res) => res.json())
      .then((data) => setNurseries(data.nurseries));
  }, []);

  return (
    <div className="nursery-page">
      <h1>Nurseries</h1>
      <div className="nursery-list">
        {nurseries.map((nursery) => (
          <div key={nursery._id} className="nursery-card">
            <h2>{nursery.name}</h2>
            <p>Location: {nursery.location}</p>
            <h3>Products:</h3>
            <ul>
              {nursery.products.map((product, index) => (
                <li key={index}>
                  {product.category} - {product.productName}: ₹{product.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};