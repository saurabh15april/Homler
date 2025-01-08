import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // FontAwesome Icons

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
    <div style={{ textAlign: "center", padding: "40px", fontFamily: "'Roboto', sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#343a40", marginBottom: "20px" }}>{title}</h1>
      <button
        onClick={handleCreateClick}
        style={{
          padding: "12px 25px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "50px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
      >
        Create New
      </button>
      <p style={{ fontSize: "1.2rem", color: "#6c757d", marginTop: "20px" }}>{description}</p>

      {error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>Error: {error}</p>
      ) : products.length > 0 ? (
        <table
          style={{
            margin: "20px auto",
            borderCollapse: "collapse",
            width: "95%",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fa",
            animation: "fadeIn 0.6s ease",
          }}
        >
          <thead>
            <tr style={{ background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }}>
              {["Unique ID", "Create Date", "Machine Name", "Joint Date", "Joint Name", "Inspection Date", "Next Inspection Date", "Gap Date", "Observation", "Compliance Status", "Worker Name", "Guidance", "PTW"].map((header) => (
                <th key={header} style={headerStyle}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  transition: "background-color 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f1f3f5")}
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor =
                    index % 2 === 0 ? "#f9f9f9" : "white")
                }
              >
                <td style={cellStyle}>{product.machineName}</td>
                <td style={cellStyle}>{product.jointNo}</td>
                <td style={cellStyle}>{product.inspectionDate}</td>
                <td style={cellStyle}>{product.nextInspectionDate}</td>
                <td style={cellStyle}>{product.observation}</td>
                <td style={cellStyle}>{product.complianceStatus}</td>
                <td style={cellStyle}>
                  <button
                    onClick={() => handleEdit(product.id)}
                    style={actionButtonStyle}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{ ...actionButtonStyle, backgroundColor: "#dc3545" }}
                  >
                    <FaTrashAlt /> Delete
                  </button>
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

const headerStyle = {
  padding: "15px 20px",
  color: "#fff",
  fontSize: "14px",
  textAlign: "center",
  fontWeight: "bold",
};

const cellStyle = {
  padding: "12px 20px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
  color: "#495057",
};

const actionButtonStyle = {
  marginRight: "10px",
  padding: "8px 16px",
  backgroundColor: "#ffc107",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  transition: "all 0.3s ease",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
};

export default CardPage;
