import { Card, Group, Text, Divider, Button, Badge, Stack } from '@mantine/core';

interface OrderSummaryProps {
  itemCount: number;
  totalPoints: number;
  handleCheckout: () => void;
}

export function OrderSummary({ itemCount, totalPoints, handleCheckout }: OrderSummaryProps) {
  return (
    <Card
      shadow="lg"
      padding="xl"
      style={{
        background: 'linear-gradient(145deg,rgb(221, 238, 251),rgb(168, 213, 248))', // Light blue gradient background
        borderRadius: '16px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
      }}
    >
      <Text size="xl" fw={850} mb="sm" style={{ textAlign: 'center', color: "black", fontFamily: 'Arial, sans-serif',}}>
        Order Summary
      </Text>
      <Divider mb="md" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} />
      <Stack justify="center" align="center" mb="md">
      <Text
  size="md"
  fw={400}
  color="black"
  style={{
    fontSize: '18px',
    textAlign: 'center',
    letterSpacing: '0.5px', // Slight spacing between letters for a sleek look
    fontWeight: 400, // Lighter font weight for the entire text
  }}
>
  You've got{' '}
  <span
    style={{
      fontSize: '22px', // Slightly larger font size for emphasis
      fontWeight: 700, // Make the number bold for emphasis
      color: '#0056b3', // A pop of color to make the number stand out
    }}
  >
    {itemCount}
  </span>{' '}
  {itemCount === 1 ? 'item' : 'items'} in your cart!
</Text>
        <Badge
          size="lg"
          color="orange"
          variant="filled"
          style={{
            marginBottom: '12px',
            fontSize: '20px', // Increase the font size
            fontWeight: 600, // Make the text bold
            padding: '8px 14px', // Adjust padding for a more noticeable look
            backgroundColor: '#ffcc99 ', // Light orange background color
            color: '#003366', // Dark blue text color for contrast
          }}
        >
          Total Points: {totalPoints.toFixed(2)}
        </Badge>
      </Stack>
      <Divider mb="lg" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }} />
      <Group justify="center">
        <Button
          fullWidth
          color="blue" // Darker blue for the button
          size="md"
          style={{
            fontSize: '16px',
            background: '#0056b3', // Darker blue for the button background
            borderRadius: '8px',
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)',
            transition: 'background 0.3s ease',
          }}
          onClick={handleCheckout}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Checkout
        </Button>
      </Group>
    </Card>
  );
}
