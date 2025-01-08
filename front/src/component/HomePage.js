import React, { useState } from "react";
import "./HomePage.css";
// import { Card } from "@mui/material";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import "./BC-1A.jpg"

const HomePage = () => {
  // const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to handle errors

  return (
    <div className="homepage">
      {/* Hero Banner */}
      <div className="hero-banner">
        <img
          src="https://as1.ftcdn.net/v2/jpg/10/55/99/78/1000_F_1055997882_oKuHJiA70colz9TY8FgxQ19m2DqK4lBw.jpg"
          alt="Hero Banner"
        />
      </div>
      <div className="hero-text">
          <h1>Welcome to Our Machine Store</h1>
          <p>Your one-stop shop for top-quality machinery</p>
        </div>
     
      {/* Error Handling */}
      {error && <div className="error">Error: {error}</div>}

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Machine Showcase</h2>
        <div className="product-grid">
          
   <Link to="/BC-1A" >  <Cards title="BC-1A" description="conveyer belt shows in this card " imageUrl="https://shorturl.at/vH0FJ"/>  </Link>
   <Link to="/BC-1B">   <Cards title="BC-1B" description="conveyer belt shows in this card " imageUrl ="https://shorturl.at/VfsR9 " /></Link>
   <Link to="/BC-2A">   <Cards title="BC-2A" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q" /></Link>
   <Link to="/BC-2B">   <Cards title="BC-2B" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/oCPyw" /></Link>
   <Link to="/BC-3A">   <Cards title="BC-3A" description="conveyer belt shows in this card " imageUrl="https://shorturl.at/iD9ml"/></Link>
   <Link to="/BC-3B">   <Cards title="BC-3B" description="conveyer belt shows in this card "  imageUrl ="https://shorturl.at/VfsR9 "/></Link>
   <Link to="/BC-4A">   <Cards title="BC-4A" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/oCPyw" /></Link>
   <Link to="/BC-4B">   <Cards title="BC-4B" description="conveyer belt shows in this card "  imageUrl=" https://shorturl.at/oCPyw"/></Link>
   <Link to= "/BC-5A">  <Cards title="BC-5A" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q"/></Link>
   <Link to= "/BC-5B">  <Cards title="BC-5B" description="conveyer belt shows in this card "  imageUrl="https://shorturl.at/vH0FJ"/></Link>
   <Link to= "/BC-6A">  <Cards title="BC-6A" description="conveyer belt shows in this card "   imageUrl ="https://shorturl.at/VfsR9"/></Link>
   <Link to= "/BC-6B">  <Cards title="BC-6B" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q" /></Link>
   <Link to= "/BC-7A">  <Cards title="BC-7A" description="conveyer belt shows in this card "imageUrl=" https://shorturl.at/oCPyw" /></Link>
   <Link to= "/BC-7B">  <Cards title="BC-7B" description="conveyer belt shows in this card " imageUrl="https://shorturl.at/iD9ml"/></Link>
   <Link to= "/BC-8A">  <Cards title="BC-8A" description="conveyer belt shows in this card " imageUrl ="https://shorturl.at/VfsR9 " /></Link>
   <Link to= "/BC-8B">  <Cards title="BC-8B" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q" /></Link>
   <Link to= "/BC-9A">  <Cards title="BC-9A" description="conveyer belt shows in this card "  imageUrl=" https://shorturl.at/oCPyw"/></Link>
   <Link to= "/BC-9B">  <Cards title="BC-9B" description="conveyer belt shows in this card "  imageUrl=" https://shorturl.at/oCPyw"/></Link>
   <Link to= "/BC-10A"> <Cards title="BC-10A" description="conveyer belt shows in this card " imageUrl ="https://shorturl.at/VfsR9 "/></Link>
   <Link to= "/BC-10B"> <Cards title="BC-10B" description="conveyer belt shows in this card "  imageUrl="https://shorturl.at/vH0FJ" /></Link>
   <Link to= "/BC-11A"> <Cards title="BC-11A" description="conveyer belt shows in this card "  imageUrl ="https://shorturl.at/VfsR9" /></Link>
   <Link to= "/BC-11B"> <Cards title="BC-11B" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/t7R3Q"/></Link>
   <Link to= "/BC-12A"> <Cards title="BC-12A" description="conveyer belt shows in this card " imageUrl=" https://shorturl.at/oCPyw" /></Link>
   <Link to= "/BC-12B"> <Cards title="BC-12B" description="conveyer belt shows in this card " imageUrl="https://shorturl.at/iD9ml" /></Link>    
        </div>
      </section>
    </div>
  );
};

export default HomePage;





