// Cart.tsx
import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, Divider, Grid } from '@mantine/core';
import { RootState } from '../../store'; // Import RootState from your store file
import { removeFromCart, updateQuantity, clearCart } from '../../slices/cartSlice';
import { purchaseVouchers } from '../../backend/database';
import { CartList } from '../../components/cartComponents/CartList';
import { OrderSummary } from '../../components/cartComponents/OrderSummary';

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
      <Text
  size="xl"
  fw={900} // Make the font weight heavier to give it more presence
  mb="lg"
  style={{
    fontSize: '25px', // Make the font size larger
    color: 'black', // A strong color for the title
    textAlign: 'left', // Center the title
    letterSpacing: '1px', // Add slight spacing between letters for a more refined look
    textTransform: 'uppercase', // Make the text uppercase for emphasis
    fontFamily: 'Arial, sans-serif', // Use a clean, modern font
  }}
>
  Your Cart
</Text>

      <Divider mb="md" />

      <Grid>
        {/* Left side - Cart items */}
        <Grid.Col span={8}>
          <div>
            {cart.map((item) => (
              <CartList
                key={item.id}
                item={item}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </Grid.Col>

        {/* Right side - Order Summary */}
        <Grid.Col span={4}>
          <OrderSummary
            itemCount={itemCount}
            totalPoints={totalPoints}
            handleCheckout={handleCheckout}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
