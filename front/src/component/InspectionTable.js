import React, { useEffect, useState } from "react";

const InspectionTable = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    fetch(`https://bummy-backend.onrender.com/data`) // Replace with your endpoint
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
  }, []);

  const handleEdit = (id) => {
    const updatedValue = prompt("Enter new data (in JSON format):");
    if (updatedValue) {
      try {
        const parsedData = JSON.parse(updatedValue);
        fetch(`https://bummy-backend.onrender.com/edit/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update data");
            }
            return response.json();
          })
          .then((updatedItem) => {
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.uniqueId === id ? updatedItem : product
              )
            );
            alert("Data updated successfully");
          })
          .catch((error) => alert("Error updating data:", error.message));
      } catch (err) {
        alert("Invalid JSON format");
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`https://bummy-backend.onrender.com/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete data");
          }
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.uniqueId !== id)
          );
          alert("Data deleted successfully");
        })
        .catch((error) => alert("Error deleting data:", error.message));
    }
  };

  const today = new Date();

  const filteredProducts = products.filter((product) => {
    if (!product.nextInspectionDate) return false;
    const nextInspectionDate = new Date(product.nextInspectionDate);
    const gapInDays = Math.ceil(
      (nextInspectionDate - today) / (1000 * 60 * 60 * 24)
    );
    return gapInDays <= 10 && gapInDays >= 0;
  });

  return (
    <div>
      {error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>Error: {error}</p>
      ) : filteredProducts.length > 0 ? (
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {[
                  "Unique ID",
                  "Create Date",
                  "Machine Name",
                  "Joint Date",
                  "Joint Name",
                  "Inspection Date",
                  "Next Inspection Date",
                  "Gap Date",
                  "Observation",
                  "Compliance Status",
                  "Worker Name",
                  "Guidance",
                  "PTW"
                  
                ].map((header) => (
                  <th key={header} style={headerStyle}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={product.uniqueId}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                    transition: "background-color 0.3s ease-in-out",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#f1f3f5")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor =
                      index % 2 === 0 ? "#f9f9f9" : "white")
                  }
                >
                  <td style={cellStyle}>{product.uniqueId}</td>
                  <td style={cellStyle}>{product.currentDate}</td>
                  <td style={cellStyle}>{product.machineName}</td>
                  <td style={cellStyle}>{product.jointDate}</td>
                  <td style={cellStyle}><b>{product.jointName}</b></td>
                  <td style={cellStyle}>{product.inspectionDate}</td>
                  <td style={cellStyle}>{product.nextInspectionDate}</td>
                  <td style={cellStyle}>
                    {Math.ceil(
                      (new Date(product.nextInspectionDate) - today) /
                        (1000 * 60 * 60 * 24)
                    )}
                    {" days"}
                  </td>
                  <td style={cellStyle}>{product.observation}</td>
                  <td style={cellStyle}>{product.complianceStatus}</td>
                  <td style={cellStyle}>{product.workerName}</td>
                  <td style={cellStyle}>{product.underGuidance}</td>
                  <td style={cellStyle}>{product.ptwNo}</td>
                  <td style={cellStyle}>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading or no products within 10 days...</p>
      )}
    </div>
  );
};

const tableContainerStyle = {
  overflowX: "auto",
};

const tableStyle = {
  margin: "20px auto",
  borderCollapse: "collapse",
  width: "100%",
  minWidth: "800px",
  borderRadius: "8px",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f8f9fa",
};

const headerStyle = {
  padding: "10px",
  color: "#fff",
  fontSize: "0.9rem",
  textAlign: "center",
  fontWeight: "bold",
  background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
};

const cellStyle = {
  padding: "10px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
  fontSize: "0.8rem",
  color: "#495057",
  wordWrap: "break-word",
};

const actionButtonStyle = {
  marginRight: "10px",
  padding: "5px 10px",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "0.8rem",
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  transition: "all 0.3s ease",
};

export default InspectionTable;
