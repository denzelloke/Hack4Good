// CartItem.tsx
import { Card, Group, Image, Text, Select, Button, Divider } from '@mantine/core';
import { removeFromCart, updateQuantity } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';

interface CartItemProps {
  item: any; // Type this more specifically based on your cart item structure
  handleUpdateQuantity: (id: string, quantity: number) => void;
  handleRemoveItem: (id: string) => void;
}

export function CartList({ item, handleUpdateQuantity, handleRemoveItem }: CartItemProps) {
  return (
    <Card key={item.id} mb="md" shadow="sm">
      <Group>
        <Image src={item.img} alt={item.name} width={80} height={80} />
        <div>
          <Text fw={500} size="lg">
            {item.name}
          </Text>
          <Text size="sm">{item.description}</Text>
          <Text size="sm" mt="sm">
            <strong>Category:</strong> {item.category}
          </Text>
          <Group mt="sm" justify="space-between" align="center">
            <Group align="center">
              <Text size="sm" fw={500} mr="sm">
                Quantity:
              </Text>
              <Select
                value={String(item.quantity)}
                onChange={(value) => handleUpdateQuantity(item.id, parseInt(value || '1', 10))}
                data={Array.from({ length: item.stock }, (_, index) => ({
                  value: String(index + 1),
                  label: `${index + 1}`,
                }))}
                style={{ width: 80 }}
              />
            </Group>

            <Button
              color="red"
              variant="outline"
              size="xs"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </Button>
          </Group>
        </div>
      </Group>

      <Divider my="sm" />

      <Group justify="space-between" mt="md">
        <Text size="md">
          <strong>Points: </strong> {item.points ? item.points.toFixed(2) : 'N/A'}
        </Text>
        <Text size="md">
          <strong>Total: </strong> {(item.points * item.quantity).toFixed(2)}
        </Text>
      </Group>
    </Card>
  );
}
