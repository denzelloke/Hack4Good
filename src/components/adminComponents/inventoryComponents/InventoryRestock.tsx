import React, { useState } from "react";
import { Modal, Text, Button, Group, NumberInput, Stack } from "@mantine/core";
import { Product } from "../../../types"; // Assuming you have a Product type

interface InventoryRestockProps {
  opened: boolean;
  onClose: () => void;
  product: Product | null; // The product to restock
  stock: number; // Stock as a number
  onRestock: (newStock: number) => void; // Callback function to handle the restock
}

const InventoryRestock: React.FC<InventoryRestockProps> = ({
  opened,
  onClose,
  product,
  stock,
  onRestock,
}) => {
  // Set the initial quantity based on the passed stock prop
  const [quantity, setQuantity] = useState<number>(stock);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 0)); // Prevent going below 0
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1); // Increase by 1
  };

  const handleInputChange = (value: string | number) => {
    setQuantity(Number(value)); // Update input value
  };

  return (
    <Modal opened={opened} onClose={onClose} title={`Restock: ${product?.name}`} centered>
      {product && (
        <Stack align="center" style={{ width: "100%" }}>
          {/* Display Current Stock */}
          <Text size="md" >
            Current Stock: {stock}
          </Text>

          {/* Number Input and + / - Buttons */}
          <Group justify="space-between" align="center" style={{ width: "100%" }}>
            <Button onClick={handleDecrease} variant="outline" color="red" size="sm" 
            style={{
                width: "15%"
            }}
            >
              -
            </Button>
            <NumberInput
              value={quantity}
              onChange={handleInputChange}
              min={0}
              max={500} // Set a reasonable max value
              style={{ width: "60%", textAlign: "center" }}
              inputMode="numeric"
            />
            <Button onClick={handleIncrease} variant="outline" color="green" size="sm"
            style={{
                width: "15%"
            }}
            >
              +
            </Button>
          </Group>

          {/* Restock Button */}
          <Group justify="center">
            <Button onClick={() => onRestock(quantity)} color="green"
                style={{
                    width: "100%"
                }}>
              Update Stock
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
};

export default InventoryRestock;
