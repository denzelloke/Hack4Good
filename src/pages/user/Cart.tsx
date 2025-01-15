import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, Group, Button, Divider, Grid, Card, Image, Select } from '@mantine/core';
import { RootState } from '../../store'; // Import RootState from your store file
import { removeFromCart, updateQuantity, clearCart } from '../../slices/cartSlice';
import { purchaseVouchers } from '../../backend/database'

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items); // Access the cart items from the global state

  // Update quantity handler
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  // Remove item handler
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    await purchaseVouchers(cart);
    dispatch(clearCart());
  };

  // Calculate total points
  const totalPoints = cart.reduce((total, item) => total + item.points * item.quantity, 0);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0); // Total item count

  return (
    <Container size="lg" py="xl">
      <Text size="xl" fw={700} mb="lg">
        Your Cart
      </Text>

      <Divider mb="md" />

      <Grid>
        {/* Left side - Cart items */}
        <Grid.Col span={8}>
          <div>
            {cart.map((item) => (
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
            ))}
          </div>
        </Grid.Col>

        {/* Right side - Order Summary */}
        <Grid.Col span={4}>
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
        </Grid.Col>
      </Grid>
    </Container>
  );
}
