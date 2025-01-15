import { useState, useEffect } from 'react';
import { getUser } from '../../backend/database';
import { User } from '../../types';
import { Container, Box, Text, Select, Button, Group } from '@mantine/core';
import { NavLink } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]);

  // Fetch user data on component load
  useEffect(() => {
    const fetchData = async () => {
      const [fetchedUser] = await getUser();
      setUser(fetchedUser);

      // TO DO: clicking the dropdown should link to transaction history stored in DB
      setTransactionHistory([
        'This Week',
        'This Month',
        'All Time',
      ]);
    };

    fetchData();
  }, []);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container size="sm" mt="lg">

      {/* Profile Card */}
      <Box
        style={{
          width: '400px', // Increased size for profile card
          height: '250px',
          backgroundImage: `url('testBG.jpg')`, // Replace with actual image
          backgroundSize: 'cover',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Text size="lg" weight={700} color="black">
          User: {user.username}
        </Text>
        <Text size="md" color="black">
          Points: {user.points}
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
          right: '10px',
        }}
      >
        LOGOUT
      </Button>

    
    


      {/* Dropdown Menu */}
      <Box mt="lg">
        <Select
          placeholder="Select a transaction"
          data={transactionHistory.map((transaction, index) => ({
            value: `transaction-${index}`,
            label: transaction,
          }))}
          label="Transaction History"
        />
      </Box>

     
      

    
      
    </Container>
  );
}
