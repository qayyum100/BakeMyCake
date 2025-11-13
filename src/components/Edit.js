import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "./App";
const Edit = () => {
  const { products, setProducts } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    // Fetch the current product details
    axios
      .get(`http://localhost:3001/cakes/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Product not found");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.put(`http://localhost:3001/cakes/${id}`, formData);

    // Update products in context
    const updated = products.map((item) =>
      item.id === parseInt(id) ? { ...item, ...formData } : item
    );
    setProducts(updated);
   

    alert("Product updated successfully!");
    navigate("/");  // or to adminhome if you prefer
  } catch (err) {
    alert("Update failed");
  }
};

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        Name<input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        Price<input
          type="text"
          name="price"
          value={formData.price}
          placeholder="Price"
          onChange={handleChange}
          required
        />
        Category<input
          type="text"
          name="category"
          value={formData.category}
          placeholder="Category"
          onChange={handleChange}
          required
        />
        Image<input
          type="text"
          name="image"
          value={formData.image}
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ backgroundColor: "#007bff", color: "white", padding: "10px" }}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Edit;
