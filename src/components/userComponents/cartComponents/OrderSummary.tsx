import { Card, Group, Text, Divider, Button, Table, Loader } from '@mantine/core';

interface OrderSummaryProps {
  itemCount: number;
  totalPoints: number;
  userPoints: number;
  handleCheckout: () => void;
  isCheckoutDisabled: boolean;
  isCheckingOut: boolean;
}

export function OrderSummary({
  itemCount,
  totalPoints,
  userPoints,
  handleCheckout,
  isCheckoutDisabled,
  isCheckingOut,
}: OrderSummaryProps) {
  return (
<Card
  shadow="lg"
  padding="xl"
  style={{
    background: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    padding: '24px',
  }}
>
  <Text
    size="xl"
    fw={700}
    mb="lg"
    style={{
      color: '#333333',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    Order Summary
  </Text>
  <Divider mb="md" style={{ borderColor: '#dcdcdc' }} />
  
  <Table mb="lg" style={{ border: 'none', borderSpacing: '0 8px', borderCollapse: 'separate' }}>
  <tbody>
    {/* Available Points */}
    <tr style={{
      background: '#f9f9f9',
      height: '48px',
    }}>
      <td style={{ padding: '0 14px' }}>
        <Text
          size="md"
          style={{
            color: '#333333',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 600,
          }}
        >
          Available Points:
        </Text>
      </td>
      <td style={{ padding: '0 14px', textAlign: 'right' }}>
        <Text
          size="md"
          style={{
            color: '#28a745',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 700,
          }}
        >
          {userPoints.toFixed(0)}
        </Text>
      </td>
    </tr>

    {/* Total Points */}
    <tr style={{
      background: '#f9f9f9',
      height: '48px',
    }}>
      <td style={{ padding: '0 14px' }}>
        <Text
          size="md"
          style={{
            color: '#333333',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 600,
          }}
        >
          Total Cost:
        </Text>
      </td>
      <td style={{ padding: '0 14px', textAlign: 'right' }}>
        <Text
          size="md"
          style={{
            color: '#0056b3',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 700,
          }}
        >
          {totalPoints.toFixed(0)}
        </Text>
      </td>
    </tr>
    
    
    
    {/* Balance */}
    <tr style={{
      background: '#f9f9f9',
      height: '48px',
    }}>
      <td style={{ padding: '0 14px' }}>
        <Text
          size="md"
          style={{
            color: '#333333',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 600,
          }}
        >
          Balance:
        </Text>
      </td>
      <td style={{ padding: '0 14px', textAlign: 'right' }}>
        <Text
          size="md"
          style={{
            color: userPoints - totalPoints < 0 ? '#d9534f' : '#0056b3',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 700,
          }}
        >
          {(userPoints - totalPoints).toFixed(0)}
        </Text>
      </td>
    </tr>
  </tbody>
</Table>

  <Divider mb="lg" style={{ borderColor: '#dcdcdc' }} />
  
  <Group justify="center">
    <Button
      fullWidth
      size="md"
      style={{
        fontSize: '16px',
        background: isCheckoutDisabled ? '#e0e0e0' : '#0056b3',
        color: isCheckoutDisabled ? '#9e9e9e' : '#ffffff',
        borderRadius: '8px',
        border: 'none',
        cursor: isCheckoutDisabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.3s ease',
      }}
      disabled={isCheckoutDisabled || isCheckingOut}
      onClick={handleCheckout}
    >
      {isCheckingOut ? <Loader size="sm" color="white" /> : 'Checkout'}
    </Button>
  </Group>
</Card>
  );
}
