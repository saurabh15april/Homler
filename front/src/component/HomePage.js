import React, { useEffect, useState } from "react";
import "./HomePage.css";
// import { Card } from "@mui/material";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import "./BC-1A.jpg"

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
          
   <Link to="/AddproductsBC-1A" >  <Cards title="BC-1A" description="conveyer belt shows in this card " imageUrl="https://shorturl.at/vH0FJ"/>  </Link>
   <Link to="/AddproductsBC-1B">   <Cards title="BC-1B" description="conveyer belt shows in this card " imageUrl ="https://shorturl.at/VfsR9 " /></Link>
   <Link to="/AddproductsBC-2A">   <Cards title="BC-2A" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q" /></Link>
   <Link to="/AddproductsBC-2B">   <Cards title="BC-2B" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/oCPyw" /></Link>
   <Link to="/AddproductsBC-3A">   <Cards title="BC-3A" description="conveyer belt shows in this card " imageUrl="https://shorturl.at/iD9ml"/></Link>
   <Link to="/AddproductsBC-3B">   <Cards title="BC-3B" description="conveyer belt shows in this card "  imageUrl ="https://shorturl.at/VfsR9 "/></Link>
   <Link to="/AddproductsBC-4A">   <Cards title="BC-4A" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/oCPyw" /></Link>
   <Link to="/AddproductsBC-4B">   <Cards title="BC-4B" description="conveyer belt shows in this card "  imageUrl=" https://shorturl.at/oCPyw"/></Link>
   <Link to= "/AddproductsBC-5A">  <Cards title="BC-5A" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q"/></Link>
   <Link to= "/AddproductsBC-5B">  <Cards title="BC-5B" description="conveyer belt shows in this card "  imageUrl="https://shorturl.at/vH0FJ"/></Link>
   <Link to= "/AddproductsBC-6A">  <Cards title="BC-6A" description="conveyer belt shows in this card "   imageUrl ="https://shorturl.at/VfsR9"/></Link>
   <Link to= "/AddproductsBC-6B">  <Cards title="BC-6B" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q" /></Link>
   <Link to= "/AddproductsBC-7A">  <Cards title="BC-7A" description="conveyer belt shows in this card "imageUrl=" https://shorturl.at/oCPyw" /></Link>
   <Link to= "/AddproductsBC-7B">  <Cards title="BC-7B" description="conveyer belt shows in this card " imageUrl="https://shorturl.at/iD9ml"/></Link>
   <Link to= "/AddproductsBC-8A">  <Cards title="BC-8A" description="conveyer belt shows in this card " imageUrl ="https://shorturl.at/VfsR9 " /></Link>
   <Link to= "/AddproductsBC-8B">  <Cards title="BC-8B" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q" /></Link>
   <Link to= "/AddproductsBC-9A">  <Cards title="BC-9A" description="conveyer belt shows in this card "  imageUrl=" https://shorturl.at/oCPyw"/></Link>
   <Link to= "/AddproductsBC-9B">  <Cards title="BC-9B" description="conveyer belt shows in this card "  imageUrl=" https://shorturl.at/oCPyw"/></Link>
   <Link to= "/AddproductsBC-10A"> <Cards title="BC-10A" description="conveyer belt shows in this card " imageUrl ="https://shorturl.at/VfsR9 "/></Link>
   <Link to= "/AddproductsBC-10B"> <Cards title="BC-10B" description="conveyer belt shows in this card "  imageUrl="https://shorturl.at/vH0FJ" /></Link>
   <Link to= "/AddproductsBC-11A"> <Cards title="BC-11A" description="conveyer belt shows in this card "  imageUrl ="https://shorturl.at/VfsR9" /></Link>
   <Link to= "/AddproductsBC-11B"> <Cards title="BC-11B" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q"/></Link>
   <Link to= "/AddproductsBC-12A"> <Cards title="BC-12A" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/oCPyw" /></Link>
   <Link to= "/AddproductsBC-12B"> <Cards title="BC-12B" description="conveyer belt shows in this card " imageUrl="https://shorturl.at/iD9ml" /></Link>    
        </div>
      </section>
    </div>
  );
};

export default HomePage;





//insert it in div product grid below

// {products.length > 0 ? (
//   products.map((product) => (
//     <div className="product-card">
//       {/* <img
//         src={product.imageUrl || "https://via.placeholder.com/200x200"}
//         alt={product.assetName || Machine ${index + 1}}
//       /> */}
//       <h3>{product.machineName }</h3>
//       <p>{product.jointName }</p>
//       <p>{product.inspectionDate }</p>
//       <p>{product.expireDate }</p>
//       <p>{product.nextInspectionDate }</p>
//       <p>{product.inspectionStatus }</p>
//       <p>{product.remark }</p>
//       <p>{product.inspectionWorker }</p>
//       <p>{product.inspectionIncharge }</p>
//       <p>{product.observation}</p>
        
//       <button >Add to notification</button>
//       <button>View</button>
//       <button>Delete</button>
//     </div>
//   ))
// ) : (
//   <p>Loading products...</p>
// )}