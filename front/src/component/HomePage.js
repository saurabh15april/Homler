import React, { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data from the API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://bummy-backend.onrender.com/*");
  //       if (!response.ok) {
  //         throw new Error(HTTP error! status: ${responsestatus});
  //       }
  //       const data = await response.json();
  //       setProducts(data); // Update the state with the fetched data
  //     } catch (err) {
  //       setError(err.message); // Handle errors
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    // Fetch data from the server
    fetch('https://bummy-backend.onrender.com/') // Replace with your endpoint
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
    // fetch('http://localhost:8080/*')
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.json(); // Parse response as JSON
    // })
    // .then(data => {
    //     console.log(data); // Handle the JSON data
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });



  }, []);

  return (
    <div className="homepage">
      {/* Hero Banner */}
      <div className="hero-banner">
        <img
          src="https://as1.ftcdn.net/v2/jpg/10/55/99/78/1000_F_1055997882_oKuHJiA70colz9TY8FgxQ19m2DqK4lBw.jpg"
          alt="Hero Banner"
        />
      </div>

      {/* Error Handling */}
      {error && <div className="error">Error: {error}</div>}

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Machines</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-card">
                {/* <img
                  src={product.imageUrl || "https://via.placeholder.com/200x200"}
                  alt={product.assetName || Machine ${index + 1}}
                /> */}
                <h3>{product.machineName }</h3>
                <p>{product.jointName }</p>
                <p>{product.inspectionDate }</p>
                <p>{product.expireDate }</p>
                <p>{product.nextInspectionDate }</p>
                <p>{product.inspectionStatus }</p>
                <p>{product.remark }</p>
                <p>{product.inspectionWorker }</p>
                <p>{product.inspectionIncharge }</p>
                <p>{product.observation}</p>
                  
                <button >Add to notification</button>
                <button>View</button>
                <button>Delete</button>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
