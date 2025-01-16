import { Card, Image, Text, Badge, Group, rem } from '@mantine/core';
import { User } from '../../types';
import { LogoutButton } from './LogoutButton';

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
     <Card 
          shadow="lg"
           padding="lg"
           radius="md"
           withBorder
           style={{
             height: rem(400),
             display: 'flex',
             borderRadius: rem(12),
           }}
           >
      <Card.Section>
        <Image
          src="/assets/MWHLogo.jpg"
          height={200}
          alt="Muhammadiyah Welfare Home"
          style={{
            objectFit: 'cover',
            borderRadius: rem(12),
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
        {new Date().toLocaleString('en-UK', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
        </Text>
        <Badge variant="outline" color="blue" size="lg">Points: {user.points}</Badge>
      </Group>

      <Text size="xl"> {user.username} </Text>

      <LogoutButton/>

    </Card>
  );
}