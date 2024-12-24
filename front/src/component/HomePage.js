import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
     

     
      {/* Hero Banner */}
      <div className="hero-banner">
        <img
          src="https://as1.ftcdn.net/v2/jpg/10/55/99/78/1000_F_1055997882_oKuHJiA70colz9TY8FgxQ19m2DqK4lBw.jpg"
          alt="Hero Banner"
        />
      </div>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Machine</h2>
        <div className="product-grid">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="product-card">
              <img
                src={`https://via.placeholder.com/200x200?text=Product+${index + 1}`}
                alt={`Product ${index + 1}`}
              />
              <h3>Machine {index + 1}</h3>
              <p>$100.00</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;
