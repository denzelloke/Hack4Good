//version 4.0: voucher filter

import { useState, useEffect } from 'react';
import { getUser, getVoucher, getProduct } from '../../backend/database';
import { User, Voucher, Product } from '../../types';
import { Container, Box, Text, Button, Card, Select } from '@mantine/core';
import { NavLink } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('ALL'); // State for dropdown filter

  // Fetch user data on component load
  useEffect(() => {
    const fetchData = async () => {
      const [fetchedUser] = await getUser();
      setUser(fetchedUser);

      const allVouchers = await getVoucher();
      const userVouchers = allVouchers.sort((a, b) => b.created_at - a.created_at);
      setVouchers(userVouchers);

      const allProducts = await getProduct();
      setProducts(allProducts);
    };

    fetchData();
  }, []);

  const isExpired = (expiredAt: number) => Date.now() >= expiredAt;

  // Filter vouchers based on selected filter
  const filteredVouchers = vouchers.filter((voucher) => {
    if (filter === 'VALID') return !voucher.is_claimed && !isExpired(voucher.expired_at);
    if (filter === 'CLAIMED') return voucher.is_claimed;
    if (filter === 'EXPIRED') return isExpired(voucher.expired_at);
    return true; // Show all if 'ALL' is selected
  });

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
          backgroundImage: `url('/assets/testBG.jpg')`,
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
          {new Date().toLocaleString('en-UK', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </Text>
        <Text size="xl" color="black">{user.username}</Text>
        <Text size="md" color="black">Wallet: {user.points} points</Text>
      </Box>

      {/* Logout Button */}
      <Button
        component={NavLink}
        to="/login"
        color="blue"
        variant="filled"
        style={{
          position: 'absolute',
          top: '100px',
          right: '70px',
        }}
      >
        LOGOUT
      </Button>

        {/* Banner with Dropdown */}
      <Box
        mt="lg"
        style={{
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Text size="lg" mb="sm">
          Filter Vouchers:
        </Text>
        <Select
        placeholder="Select a filter"
         data={[
          { value: 'ALL', label: 'All Vouchers' },
          { value: 'VALID', label: 'Valid' },
          { value: 'CLAIMED', label: 'Claimed' },
          { value: 'EXPIRED', label: 'Expired' },
        ]}
        value={filter}
        onChange={(value) => setFilter(value ?? 'ALL')} // Default to 'ALL' if value is null
        />

      </Box>


      {/* Voucher Cards */}
      <Box mt="lg">
        {filteredVouchers.map((voucher) => {
          const product = products.find((prod) => prod.id === String(voucher.product_id));
          //finds product_id of each indiv voucher and pulls data from that product_id in database

          // Determine card status and styles
    let statusText = '';
    let backgroundColor = '';

    if (voucher.is_claimed) {
      statusText = 'CLAIMED';
      backgroundColor = '#f5bc5b';
    } else if (isExpired(voucher.expired_at)) {
      statusText = 'EXPIRED';
      backgroundColor = '#f29f99';
    } else {
      statusText = 'VALID';
      backgroundColor = '#94f78b';
    }

          return (
            <Card
              key={voucher.id}
              shadow="sm"
              p="lg"
              style={{
                backgroundColor,
                color: 'black',
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {/* Product Image */}
              {product && (
                <Box
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundImage: `url(${product.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    marginRight: '16px',
                  }}
                />
              )}

              {/* Product Details */}
              <Box style={{ flex: 1 }}>
                <Text size="md">{product?.name}</Text>
                <Text size="sm">Purchased: {new Date(voucher.created_at).toLocaleString()}</Text>
                <Text size="sm">Expires On: {new Date(voucher.expired_at).toLocaleString()}</Text>
                <Text size="sm">Voucher ID: {voucher.id}</Text>
              </Box>

              {/* Status Text */}
              <Text
                size="lg"
                style={{
                  position: 'absolute',
                  right: '16px', // Flush right
                  textAlign: 'center',
                  top: '50%', // Vertically centered
                  transform: 'translateY(-50%)', // Adjust for true centering
               }}
              >
                 {statusText}
               </Text>

            </Card>
          );
        })}
      </Box>
    </Container>
  );
}
