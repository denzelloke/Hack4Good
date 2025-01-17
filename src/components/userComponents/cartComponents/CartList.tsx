import { Card, Group, Image, Text, Select, Button, Tooltip, Modal } from '@mantine/core';
import { useState } from 'react';
import { getImageUrl } from '../../../backend/storage';

interface CartItemProps {
  item: any; // Replace 'any' with your cart item type
  handleUpdateQuantity: (id: string, quantity: number) => void;
  handleRemoveItem: (id: string) => void;
}

export function CartList({ item, handleUpdateQuantity, handleRemoveItem }: CartItemProps) {
  // useState to manage the modal visibility for removal confirmation
  const [modalOpen, setModalOpen] = useState(false);

  // Function to confirm removal and close the modal
  const confirmRemove = () => {
    handleRemoveItem(item.id);
    setModalOpen(false); // Close the modal after removing the item
  };

  return (
    <Card
      key={item.id}
      mb="md"
      shadow="sm"
      radius="md"
      withBorder
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        padding: '16px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
      }}
    >
      <Group align="flex-start">
        <Text
          style={{
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxHeight: '40px',
            maxWidth: '40px'
          }}
        >{item.name} </Text>
        <div style={{ flex: 1 }}>
          <Text fw={600} size="lg" style={{ color: '#333' }}>
            {item.name}
          </Text>
          <Text size="sm"  style={{ marginBottom: '0.5rem' }}>
            {item.description}
          </Text>
          <Text size="sm" style={{ marginBottom: '0.5rem' }}>
            <strong>Category:</strong> {item.category}
          </Text>
          <Group mt="sm" align="center">
            <Text size="sm" fw={500}>
              Quantity:
            </Text>
            <Select
              value={String(item.quantity)}
              onChange={(value) =>
                handleUpdateQuantity(item.id, parseInt(value || '1', 10))
              }
              data={Array.from({ length: item.stock }, (_, index) => ({
                value: String(index + 1),
                label: `${index + 1}`,
              }))}
              style={{ width: 80 }}
            />
          </Group>
        </div>

        <div
          style={{
            textAlign: 'right',
            minWidth: '150px',
            flexDirection: 'column',
            gap: '12px', // Subtle spacing
            alignItems: 'flex-end',
            display: 'flex',
          }}
        >
          {/* Points Per Item */}
          <Text
            size="md"
            fw={600} // Slightly less bold
            color="teal"
            style={{
              fontSize: '14px',
              backgroundColor: 'rgba(0, 128, 128, 0.05)', // Subtle teal background
              padding: '6px 10px',
              borderRadius: '6px',
            }}
          >
            Points Per Item: {item.points ? item.points.toFixed(2) : 'N/A'}
          </Text>

          {/* Total */}
          <Text
            size="md"
            fw={600}
            color="blue"
            style={{
              fontSize: '14px',
              backgroundColor: 'rgba(0, 0, 255, 0.05)', // Subtle blue background
              padding: '6px 10px',
              borderRadius: '6px',
            }}
          >
            Total: ${(item.points * item.quantity).toFixed(2)}
          </Text>

          {/* Remove Button */}
          <Tooltip label="Remove item from cart" withArrow>
            <Button
              color="red"
              variant="outline"
              size="sm" // Smaller size for subtlety
              onClick={() => setModalOpen(true)} // Open confirmation modal
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                transition: 'background-color 0.2s ease',
              }}
            >
              Remove
            </Button>
          </Tooltip>

          {/* Confirmation Modal */}
          <Modal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <Text>Are you sure you want to remove this item from the cart?</Text>
            <Group justify="space-between" mt="md">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button color="red" onClick={confirmRemove}>
                Confirm
              </Button>
            </Group>
          </Modal>
        </div>
      </Group>
    </Card>
  );
}
