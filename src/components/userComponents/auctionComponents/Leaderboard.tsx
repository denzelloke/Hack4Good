import { Card, Box, Text, rem } from '@mantine/core';
import { AuctionBid, User } from '../../../types';

interface LeaderboardProps {
  bids: AuctionBid[];
  users: User[]; // Add users as a prop
}

export default function Leaderboard({ bids, users }: LeaderboardProps) {
  // Helper function to get the username by user ID
  const getUserById = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      console.warn(`No user found for user_id: ${userId}`);
      return 'Unknown';
    }
    return user.username;
  };

  return (
    <Box mt="xl">
      <Text size="xl" fw={700} mb="md">Leaderboard</Text>
      {bids.map((bid, index) => (
        <Card
          key={bid.id}
          shadow="sm"
          p="lg"
          style={{
            marginBottom: '10px',
            backgroundColor: index === 0 ? '#e8f5e9' : '#f9f9f9', // Highlight top bid
            border: index === 0 ? '2px solid #4caf50' : '1px solid #ddd',
            borderRadius: rem(12),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: index === 0 ? rem(120) : rem(100), // Adjust card height
          }}
        >
          {/* Points Column */}
          <Box style={{ flex: 1, textAlign: 'center' }}>
            <Text
              size={index === 0 ? 'xl' : 'lg'}
              fw={index === 0 ? 700 : 500}
              style={{
                color: index === 0 ? '#2e7d32' : '#333', // Highlight top bid
              }}
            >
              {bid.points} Points
            </Text>
          </Box>

          {/* Username Column */}
          <Box style={{ flex: 1, textAlign: 'center' }}>
            <Text
              size={index === 0 ? 'lg' : 'md'}
              fw={index === 0 ? 700 : 500}
            >
              {getUserById(bid.user_id)}
            </Text>
          </Box>

          {/* Date Column */}
          <Box style={{ flex: 1, textAlign: 'center' }}>
            <Text size="sm" c="dimmed">
              {new Date(bid.created_at).toLocaleString()}
            </Text>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
