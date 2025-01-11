import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // FontAwesome Icons
import * as XLSX from "xlsx"; // Import the xlsx library
import NotificationPage from "./NotificationPage"; 
const CardPage = ({ title, description }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to store fetched products
  const [notifications, setNotifications] = useState(['']);
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
        const toda = new Date();
        const filteredNotifications = result.filter((product) => {
          const gap = Math.ceil(
            Math.abs(toda - new Date(product.nextInspectionDate)) / (1000 * 60 * 60 * 24)
          );
          return gap < 10;
        });

        setNotifications(
          filteredNotifications.map((product) => ({
            id: product.uniqueId,
            title: "Inspection Reminder",
            message: `Next inspection for ${product.machineName} is scheduled on ${product.nextInspectionDate}.`,
          }))
        );

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, [id]); // Dependency array includes 'id'
  
  



  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products); // Convert JSON data to a worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, `${id}_Products.xlsx`); // Download as Excel file
  };
  const today = new Date();
    const formattedDate = today.toLocaleDateString(); 
    


    // const notification = products.filter((product) => {
    //   const gapDays = Math.ceil(
    //     Math.abs(today - new Date(product.nextInspectionDate)) / (1000 * 60 * 60 * 24)
    //   );
    //   return gapDays < 10 ;
    // });
    // const handleViewNotifications = () => {
    //   navigate("/NotificationPage", { state: { notification} });
    // };
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>{id}</h1>
      <button
        onClick={handleCreateClick}
        style={createButtonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
      >
        Create New
      </button>
      {/* <button onClick={handleViewNotifications} style={createButtonStyle}>
        View Notifications
      </button> */}
      <button
        onClick={handleExportToExcel}
        style={createButtonStyle}
      >
        Export to Excel
      </button>
      <p style={descriptionStyle}>{description}</p>

      {error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>Error: {error}</p>
      ) : products.length > 0 ? (
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
                  "PTW",
                  "Action"
                ].map((header) => (
                  <th key={header} style={headerStyle}>
                    {header}
                  </th>
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
                    (e.target.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "white")
                  }
                >
                   <td style={cellStyle}>{product.uniqueId}</td>
                  <td style={cellStyle}>{product.currentDate}</td>
                  <td style={cellStyle}>{product.machineName}</td>
                  <td style={cellStyle}>{product.jointDate}</td>
                  <td style={cellStyle}>{product.jointName}</td>
                  <td style={cellStyle}>{product.inspectionDate}</td>
                  <td style={cellStyle}>{product.nextInspectionDate}</td>
                  <td style={cellStyle}>
   
           {Math.ceil(
        Math.abs(new Date(formattedDate) - new Date(product.nextInspectionDate)) /
        (1000 * 60 * 60 * 24)
    )}
</td>
                  <td style={cellStyle}>{product.observation}</td>
                  <td style={cellStyle}>{product.complianceStatus}</td>
                  <td style={cellStyle}>{product.workerName}</td>
                  <td style={cellStyle}>{product.underGuidance}</td>
                  <td style={cellStyle}>{product.ptwNo}</td>
                  <td style={cellStyle}>
                    <button onClick={() => handleEdit(product.id)} style={actionButtonStyle}>
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
          {/* <NotificationPage notifications={notifications} /> */}
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

// Responsive Styles
const containerStyle = {
  textAlign: "center",
  padding: "20px",
  fontFamily: "'Roboto', sans-serif",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
};

const headingStyle = {
  fontSize: "2rem",
  color: "#343a40",
  marginBottom: "20px",
};

const createButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "25px",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
  marginBottom: "20px",
};

const descriptionStyle = {
  fontSize: "1rem",
  color: "#6c757d",
  marginBottom: "20px",
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
  backgroundColor: "#ffc107",
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

export default CardPage;
