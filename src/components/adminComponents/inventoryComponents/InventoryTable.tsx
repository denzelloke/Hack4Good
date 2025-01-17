import React, { useState } from "react";
import { Table, Paper, Button, Group } from "@mantine/core";
import { Product } from "../../../types";
import InventoryRestock from "./InventoryRestock";


interface InventoryTableProps {
  filteredProducts: Product[];
  handleOpenModal: (product: Product) => void;
  handleRestock: (product: Product, newStock: number) => void;
  handleDelete: (productId: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  filteredProducts,
  handleOpenModal,
  handleRestock,
  handleDelete,
}) => {
  const [opened, setOpened] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Function to open the modal and set the current product
  const openRestockModal = (product: Product) => {
    setCurrentProduct(product);
    setOpened(true);
  };

  // Function to close the modal
  const closeRestockModal = () => {
    setOpened(false);
    setCurrentProduct(null);
  };

  // Handle restocking (called from Restock Modal)
  const handleRestockModal = (newStock: number) => {
    if (currentProduct) {
      handleRestock(currentProduct, newStock); // Pass updated stock to the parent
      closeRestockModal();
    }
  };

  return (
    <>
      <Paper shadow="sm" p="lg" style={{ borderRadius: "10px", marginTop: "20px" }}>
        <Table highlightOnHover withColumnBorders>
          <thead style={{ backgroundColor: "#f5f7fa", borderRadius: "8px" }}>
            <tr>
              <th style={{ width: "20%" }}>Product Name</th>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "15%" }}>Category</th>
              <th style={{ width: "15%" }}>Stock</th>
              <th style={{ width: "10%" }}>Points</th>
              <th style={{ width: "40%" }}>Action</th> {/* Column for buttons */}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} style={{ transition: "background-color 0.2s" }}>
                <td>{product.name}</td>
                <td style={{ textAlign: "center" }}>{product.id}</td>
                <td style={{ textAlign: "center" }}>{product.category}</td>
                <td
                  style={{
                    backgroundColor: product.stock > 0 ? "#d4f7d4" : "#f7d4d4", // Pale green if in stock, pale red if out of stock
                    color: product.stock > 0 ? "#4caf50" : "#f44336", // Green text if in stock, red text if out of stock
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {product.stock > 0 ? `${product.stock}` : "Out of Stock"}
                </td>
                <td style={{ textAlign: "center" }}>{product.points}</td>
                <td style={{ textAlign: "center" }}>
                  <Group align="row" style={{ justifyContent: "center", gap: 16 }}>
                    <Button
                      variant="outline"
                      color="blue"
                      size="sm"
                      onClick={() => handleOpenModal(product)}
                    >
                      More Info
                    </Button>
                    <Button
                      variant="outline"
                      color="green"
                      size="sm"
                      onClick={() => openRestockModal(product)} 
                    >
                      Restock
                    </Button>
                    <Button
                      variant="outline"
                      color="red"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>

      {/* Restock Modal */}
      {currentProduct && (
        <InventoryRestock
          opened={opened}
          onClose={closeRestockModal}
          product={currentProduct}
          stock={currentProduct.stock}
          onRestock={handleRestockModal}
        />
      )}
    </>
  );
};

export default InventoryTable;
