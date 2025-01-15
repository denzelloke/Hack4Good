import { Card, Image, Text, Group, Button, rem, Divider } from '@mantine/core';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      shadow="lg"
      padding="lg"
      radius="md"
      withBorder
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        width: rem(300),
        height: rem(450),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: rem(12),
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      className="product-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
    >
      <Card.Section>
        <Image
          src={product.img}
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
          {product.points ? product.points : 'N/A'}
        </Text>
      </Group>

      {/* Stock Progress */}
      <Group justify="space-between" mb="xs">
        <Text size="sm" color="dimmed">Stock:</Text>
        <Text size="sm" color={product.stock > 0 ? 'teal' : 'red'}>
          {product.stock > 0 ? 'Item available' : 'Out of stock'}
        </Text>
      </Group>

      <Divider mb="xs" />

      {/* Add to Cart or Stock Coming Soon */}
      {product.stock > 0 ? (
        <Button
          fullWidth
          variant="filled"
          color="blue"
          onClick={onClick}
          style={{
            marginTop: rem(10),
            height: rem(40),
            fontWeight: 700,
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.borderColor = '#0056b3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#007bff';
            e.currentTarget.style.borderColor = '#007bff';
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
          Stock Coming Soon
        </div>
      )}
    </Card>
  );
}
