import { Card, Group, Text, Divider, Button } from '@mantine/core';

interface OrderSummaryProps {
  itemCount: number;
  totalPoints: number;
  handleCheckout: () => void;
}

export function OrderSummary({ itemCount, totalPoints, handleCheckout }: OrderSummaryProps) {
  return (
    <Card shadow="sm" padding="md">
      <Text size="lg" fw={700} mb="sm">
        Order Summary
      </Text>
      <Group justify="space-between" mb="md">
        <Text size="md" fw={500}>
          Subtotal ({itemCount} items)
        </Text>
        <Text size="md" fw={500}>
          Total: {totalPoints.toFixed(2)}
        </Text>
      </Group>
      <Divider mb="md" />
      <Button fullWidth color="blue" size="md" onClick={handleCheckout}>
        Checkout
      </Button>
    </Card>
  );
}
