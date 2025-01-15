import { useState, useEffect } from 'react';
import { getUser, getVoucher } from '../../backend/database';
import { User, Voucher } from '../../types';
import { Container, Box, Text, Button, Card, Group } from '@mantine/core';
import { NavLink } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  // Fetch user data on component load
  useEffect(() => {
    const fetchData = async () => {
      const [fetchedUser] = await getUser();
      setUser(fetchedUser);

      const allVouchers = await getVoucher();

      // Filter and sort vouchers based on the current user's ID and date
      const userVouchers = allVouchers
        //.filter((voucher) => voucher.user_id === fetchedUser.id)
        //i think the current user has no id or smth thats why the above line doesnt work
        .sort((a, b) => b.created_at - a.created_at); // Most recent first

      setVouchers(userVouchers);
    };

    fetchData();
  }, []);

  const isExpired = (expiredAt: number) => {
    const currentMillis = Date.now();
    return expiredAt <= currentMillis;
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container size="sm" mt="lg">

      {/* Profile Card */}
      <Box
        style={{
          width: '600px', 
          height: '400px',
          backgroundImage: `url('/assets/testBG.jpg')`, // Replace with MWH background
          backgroundSize: 'cover',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Text size="xl" color="black">
          {user.username}
        </Text>
        <Text size="md" color="black">
          Wallet: {user.points} points
        </Text>
      </Box>

      {/* Logout Button */}
      <Button
        component={NavLink}
        to="/login"
        color="blue"
        variant="filled"
        style={{
          position: 'absolute',
          top: '100px', // Position the button at the top-right corner
          right: '70px',
        }}
      >
        LOGOUT
      </Button>

    
    {/* Voucher Cards */}
    <Box mt="lg">
        {vouchers.map((voucher) => (
          <Card
            key={voucher.id}
            shadow="sm"
            p="lg"
            style={{
              backgroundColor: isExpired(voucher.expired_at)
                ? '#f29f99'
                : '#94f78b',
              color: 'black',
              marginBottom: '10px',
            }}
          >
            <Group>
              <Text size="md">Voucher ID: {voucher.id}</Text>
              <Text size="md">Product ID: {voucher.product_id}</Text>
            </Group>
            <Text size="sm">
              Purchased: {new Date(voucher.created_at).toLocaleString()}
            </Text>
            <Text size="sm">
              Expires On: {new Date(voucher.expired_at).toLocaleString()}
            </Text>
          </Card>
        ))}
      </Box>   
      

    
      
    </Container>
  );
}
