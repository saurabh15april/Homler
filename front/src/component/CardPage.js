import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CardPage = ({ title, description }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams();

  const handleCreateClick = () => {
    navigate("/form"); // Redirect to the form page
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://bummy-backend.onrender.com/${id}/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      // Remove the deleted product from the UI
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit/${productId}`); // Navigate to the edit page with product ID
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
  }, [id]); // Dependency array includes 'id'

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
        <table style={{ margin: "20px auto", borderCollapse: "collapse", width: "80%" }}>
          <thead>
            <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Unique ID</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Create Date</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Machine Name</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Joint Date</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Joint Name</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Inspection Date</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Next Inspection Date</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Gap Date</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Observation</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Compliance Status</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>workerName</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Guidance</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>PTW</th>
           
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{product.machineName}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{product.jointNo}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{product.inspectionDate}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{product.nextInspectionDate}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{product.observation}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{product.complianceStatus}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <button onClick={() => handleEdit(product.id)} style={{ marginRight: "10px" }}>Edit</button>
                  <button onClick={() => handleDelete(product.id)} style={{ color: "red" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default CardPage;
