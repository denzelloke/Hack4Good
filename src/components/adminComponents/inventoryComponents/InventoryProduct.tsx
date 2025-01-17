import React from "react";
import { Modal, Text, Group, Image, Button, Box, Stack } from "@mantine/core";
import { Product } from "../../../types";
import { getImageUrl } from "../../../backend/storage";

interface InventoryProductProps {
  opened: boolean;
  onClose: () => void;
  product: Product | null;
}

const InventoryProduct: React.FC<InventoryProductProps> = ({ opened, onClose, product }) => {
  if (!product) return null;

  return (
    <Modal opened={opened} onClose={onClose} title={`Product ID: ${product.id}`} centered size="lg">
      <Box
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Product Image */}
        <Image
          src={getImageUrl(product.url)}
          alt={product.name}
          width={200}
          height={200}
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ddd",
            marginRight: "20px",
          }}
        />

        {/* Product Details */}
        <Stack spacing="xs" style={{ flex: 1 }}>

          {/* Name */}
          <Text size="md" weight={500} style={{ marginBottom: "10px" }}>
            <strong>Name:</strong> {product.name}
          </Text>


          {/* Stock */}
          <Text size="md" weight={600} style={{ marginBottom: "10px", color: product.stock > 0 ? "#4caf50" : "#f44336" }}>
            <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} items` : "Out of Stock"}
          </Text>

          {/* Points */}
          <Text size="md" weight={600} style={{ marginBottom: "10px" }}>
            <strong>Points:</strong> {product.points}
          </Text>

          {/* Description */}
          <Text size="sm" weight={500} style={{ marginBottom: "10px" }}>
            <strong>Description:</strong> {product.description}
          </Text>
        </Stack>
      </Box>

      {/* Close Button */}
      <Group position="center" style={{ marginTop: "20px" }}>
        <Button variant="light" color="blue" onClick={onClose} style={{ width: "120px" }}>
          Close
        </Button>
      </Group>
    </Modal>
  );
};

export default InventoryProduct;
