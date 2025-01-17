import React, { useState } from "react";
import { FileInput } from "@mantine/core";
import { Product } from "../../../types";

interface ProductAddFormProps {
  onSubmit: (newProduct: Product) => void;
  maxImageSize?: number; // in bytes, default 5MB
}

const ProductAddForm: React.FC<ProductAddFormProps> = ({ 
  onSubmit,
  maxImageSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    img: null, 
    points: 0,
    stock: 0,
    url: "",
    category: "Snacks",
  });
  const [imageError, setImageError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");  // For displaying preview

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      // Reset error state
      setImageError("");

      // Validate file size
      if (file.size > maxImageSize) {
        setImageError(`File size must be less than ${maxImageSize / (1024 * 1024)}MB`);
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setImageError('Please upload an image file');
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Store the actual file
      setProduct(prev => ({
        ...prev,
        img: file
      }));

      // Clean up the preview URL when component unmounts
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview("");
      setProduct(prev => ({
        ...prev,
        img: null
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure there's an image before submitting
    if (!product.img) {
      setImageError('Please select an image');
      return;
    }

    onSubmit(product);
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
        accept="image/*"
        onChange={handleImageChange}
        error={imageError}
        style={{
          marginBottom: "16px",
        }}
      />
      {imageError && (
        <p style={{ color: "#ff4444", fontSize: "14px", marginBottom: "16px" }}>
          {imageError}
        </p>
      )}
      {imagePreview && (
        <div style={{ marginBottom: "16px" }}>
          <img 
            src={imagePreview} 
            alt="Preview" 
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "contain",
              borderRadius: "4px",
            }}
          />
        </div>
      )}

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