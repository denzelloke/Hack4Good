import { Box, Text } from '@mantine/core';
import { User } from '../../types';
import { LogoutButton } from '../../components/accountComponents/logoutButton';

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Box
      style={{
        
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
      <LogoutButton/>
    </Box>
  );
}
