import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const CardPage = ({ title, description }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams();

  const handleCreateClick = () => {
    navigate("/form"); // Redirect to the form page
  };

  useEffect(() => {
    // Fetch data from the server
    fetch(`https://bummy-backend.onrender.com/${id}`) // Replace with your endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((result) => {
        setProducts(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{title}</h1>
      <button
        onClick={handleCreateClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Create
      </button>
      <p>{description}</p>

      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product, index) => {
            const nextInspectionDate = new Date(product.nextInspectionDate);
            const inspectionDate = new Date(product.inspectionDate);
            const daysGap = Math.ceil(
              Math.abs(nextInspectionDate - inspectionDate) /
                (1000 * 60 * 60 * 24)
            );

            return (
              <div className="product-card" key={index}>
                <p>Gap: {daysGap} days</p>
                <h3>{product.machineName}</h3>
                <p>Inspection Date: {product.inspectionDate}</p>
                <p>Expire Date: {product.expireDate}</p>
                <p>Next Inspection Date: {product.nextInspectionDate}</p>
                <p>Inspection Status: {product.inspectionStatus}</p>
                <p>Remark: {product.remark}</p>
                <p>Inspection Worker: {product.inspectionWorker}</p>
                <p>Inspection Incharge: {product.inspectionIncharge}</p>
                <p>Observation: {product.observation}</p>
                <button>View</button>
                <button>Delete</button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading products... </p>
      )}
    </div>
  );
};

export default CardPage;
