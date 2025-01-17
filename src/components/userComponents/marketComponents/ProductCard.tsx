
import { Card, Image, Text, Group, Button, rem, Divider, } from '@mantine/core';
import { useState } from 'react';
import { Product } from '../../../types';
import { getImageUrl } from '../../../backend/storage';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      shadow="lg"
      padding="lg"
      radius="md"
      withBorder
      style={{
        cursor: 'pointer',
        width: rem(300),
        height: rem(450),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: rem(12),
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 12px 24px rgba(0, 0, 0, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card.Section>
        <Image
          src={getImageUrl(product.url)}
          height={200}
          alt={product.name}
          style={{
            objectFit: 'cover',
            borderRadius: rem(12),
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600} style={{ color: '#2b2b2b', fontSize: rem(16) }}>
          {product.name}
        </Text>
        <Text fw={700} style={{ color: '#17B978', fontSize: rem(16) }}>
          Points: {product.points ? product.points : 'N/A'}
        </Text>
      </Group>

      <Group justify="space-between" mb="xs">
        <Text size="sm" color="dimmed">
          Stock:
        </Text>
        <Text size="sm" color={product.stock > 0 ? 'teal' : 'red'}>
          {product.stock > 0 ? 'Item available' : 'Out of stock'}
        </Text>
      </Group>

      <Divider mb="xs" />

      {product.stock > 0 ? (
      <Button
        fullWidth
        mt="md"
        radius="md"
        variant="light"
        onClick={onClick}
        style={{
          marginTop: rem(10),
          height: rem(40),
          fontWeight: 700,
          color: '#ffffff',
          backgroundColor: '#007bff',
          borderColor: '#007bff',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        Add to Cart
      </Button>
      ) : (
        <div
        style={{
          marginTop: rem(10),
          height: rem(40), // Same height as the button
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f1f1f1', // Light gray background
          borderRadius: rem(8), // Match button border radius
          color: '#999', // Dimmed text color
          fontStyle: 'italic',
          fontSize: rem(14),
          cursor: 'default', // Prevent pointer cursor
        }}
        >
          Stock Coming Soon!
        </div>
      )}
    </Card>
  );
}
