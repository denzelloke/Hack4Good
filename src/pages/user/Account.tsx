import { useState, useEffect } from 'react';
import { getUser } from '../../db/database';
import { User } from '../../types';
import { Container, Box, Text, Select } from '@mantine/core';

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
          margin: '0 auto',
          width: '300px',
          height: '200px',
          backgroundImage: `url('testBG.jpg')`, //replace img w photo from MWH
          backgroundSize: 'cover',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        
        <Text size="md" color="Black">
          User: {user.username}
        </Text>
        <Text size="md" color="Black">
          Points: {user.points}
        </Text>
      </Box>

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
