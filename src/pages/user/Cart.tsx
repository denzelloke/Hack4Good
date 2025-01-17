import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, Divider, Grid } from '@mantine/core';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity, clearCart } from '../../slices/cartSlice';
import { purchaseVouchers } from '../../backend/database';
import { CartList } from '../../components/userComponents/cartComponents/CartList';
import { OrderSummary } from '../../components/userComponents/cartComponents/OrderSummary';
import { getUser } from '../../backend/database';
import { useEffect, useState } from 'react';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [userPoints, setUserPoints] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fetch user points
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUserPoints(user[0]?.points || 0); // Assuming user[0] contains the points
    };
    fetchUser();
  }, []);

  // Update quantity handler
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  // Remove item handler
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Checkout handler
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await purchaseVouchers(cart);
    setUserPoints(userPoints - totalPoints);
    dispatch(clearCart());
    setIsCheckingOut(false);
  };

  // Calculate total points
  const totalPoints = cart.reduce((total, item) => total + item.points * item.quantity, 0);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Check if checkout should be disabled
  const isCheckoutDisabled = totalPoints > userPoints;

  return (
    <Container size="lg" py="xl">
      <Text
        size="xl"
        fw={900}
        mb="lg"
        style={{
          fontSize: '25px',
          color: 'black',
          textAlign: 'left',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontFamily: 'Arial, sans-serif',
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
            userPoints={userPoints}
            handleCheckout={handleCheckout}
            isCheckoutDisabled={isCheckoutDisabled}
            isCheckingOut={isCheckingOut}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
