import { Card, Group, Image, Text, Select, Button, Divider, Tooltip, Badge } from '@mantine/core';

interface CartItemProps {
  item: any; // Replace 'any' with your cart item type
  handleUpdateQuantity: (id: string, quantity: number) => void;
  handleRemoveItem: (id: string) => void;
}

export function CartList({ item, handleUpdateQuantity, handleRemoveItem }: CartItemProps) {
  return (
    <Card
      key={item.id}
      mb="md"
      shadow="sm"
      radius="md"
      withBorder
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
        <Image
          src={item.img}
          alt={item.name}
          width={80}
          height={80}
          style={{
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
        <div style={{ flex: 1 }}>
          <Text fw={500} size="lg" style={{ color: '#333' }}>
            {item.name}
          </Text>
          <Text size="sm" color="dimmed" style={{ marginBottom: '0.5rem' }}>
            {item.description}
          </Text>
          <Text size="sm" style={{ marginBottom: '0.5rem' }}>
            <strong>Category:</strong> {item.category}
          </Text>
          <Group mt="sm" justify="space-between" align="center">
            <Group align="center" style={{ gap: '16px' }}>
              <Text size="sm" fw={500}>
                Quantity:
              </Text>
              <Select
                value={String(item.quantity)}
                onChange={(value) => handleUpdateQuantity(item.id, parseInt(value || '1', 10))}
                data={Array.from({ length: item.stock }, (_, index) => ({
                  value: String(index + 1),
                  label: `${index + 1}`,
                }))}
                style={{
                  width: 100,
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
                size="sm"
              />
            </Group>
            <Tooltip label="Remove item from cart" withArrow>
              <Button
                color="red"
                variant="outline"
                size="xs"
                onClick={() => handleRemoveItem(item.id)}
                style={{
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Remove
              </Button>
            </Tooltip>
          </Group>
        </div>
      </Group>

      <Divider my="sm" />

      <Group justify="space-between" mt="md">
        <Badge size="lg" color="green" radius="sm">
          Points: {item.points ? item.points.toFixed(2) : 'N/A'}
        </Badge>
        <Text size="lg" fw={600} style={{ color: '#555' }}>
          Total: ${(item.points * item.quantity).toFixed(2)}
        </Text>
      </Group>
    </Card>
  );
}
