import React, { useState } from "react";
import { Product } from "../../../types";
import { FileInput } from "@mantine/core";

interface ProductAddFormProps {
  onSubmit: (newProduct: Product) => void;
}

const ProductAddForm: React.FC<ProductAddFormProps> = ({ onSubmit }) => {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    img: "",
    points: 0,
    stock: 0,
    url: "",
    category: "Snacks", // Default category
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      // Convert the file to a base64 URL (or you can handle it differently)
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          img: reader.result as string, // Store the image data URL in the state
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product); // Pass the new product to the parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <label htmlFor="name" style={{ marginBottom: "8px", fontWeight: "600" }}>
        Product name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={product.name}
        onChange={handleChange}
        required
        style={{
          padding: "8px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          fontSize: "14px",
        }}
      />

      <label htmlFor="description" style={{ marginBottom: "8px", fontWeight: "600" }}>
        Description:
      </label>
      <input
        type="text"
        id="description"
        name="description"
        value={product.description}
        onChange={handleChange}
        required
        style={{
          padding: "8px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          fontSize: "14px",
        }}
      />

      <label htmlFor="img" style={{ marginBottom: "8px", fontWeight: "600" }}>
        Image:
      </label>
      <FileInput
        id="img"
        name="img"
        value={product.img} // This holds the image data URL or the path
        onChange={handleImageChange} // Handle image selection
        required
        label="Upload Image"
        style={{
          marginBottom: "16px",
        }}
      />

      <label htmlFor="points" style={{ marginBottom: "8px", fontWeight: "600" }}>
        Points:
      </label>
      <input
        type="number"
        id="points"
        name="points"
        value={product.points}
        onChange={handleChange}
        required
        style={{
          padding: "8px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          fontSize: "14px",
        }}
      />

      <label htmlFor="stock" style={{ marginBottom: "8px", fontWeight: "600" }}>
        Stock:
      </label>
      <input
        type="number"
        id="stock"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        required
        style={{
          padding: "8px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          fontSize: "14px",
        }}
      />

      <label htmlFor="category" style={{ marginBottom: "8px", fontWeight: "600" }}>
        Category:
      </label>
      <select
        id="category"
        name="category"
        value={product.category}
        onChange={handleChange}
        style={{
          padding: "8px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          fontSize: "14px",
        }}
      >
        <option value="Snacks">Snacks</option>
        <option value="Drinks">Drinks</option>
        <option value="Toiletries">Toiletries</option>
        <option value="Stationary">Stationary</option>
        <option value="Books">Books</option>
      </select>

      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductAddForm;
