// src/components/ProductList.js
import React from "react";
import ProductCard from "./ProductCard";
import { useContext } from "react";
import { DataContext } from "./App";

function ProductList() {
  const{filteredProducts} = useContext(DataContext);
  return (
    <div className="product-list-container" style={{ padding: "0 20px" }}>
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 20px", fontSize: "18px", color: "#888" }}>
          No searched cake Found... <br />
          <span style={{ fontStyle: "italic", color: "#555" }}>
            But, We will make better one for you with what we have ;-)
          </span>
        </div>
      ) : (

        // Render Product Card components for each product in the filteredProducts array
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {filteredProducts.map((item) => (
            <ProductCard item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
