import { Card, Image, Text, Group, Button, rem, Progress, Divider } from '@mantine/core';
import { Product } from '../types';
import { IconShoppingCart } from '@tabler/icons-react';

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
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}
      className="product-card"
    >
      <Card.Section>
        <Image
          src={product.img}
          height={200}
          alt={product.name}
          style={{
            objectFit: 'cover',
            borderRadius: rem(8),
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} style={{ color: '#2b2b2b' }}>
          {product.name}
        </Text>
        <Text fw={700} style={{ color: '#17B978' }}>
          {product.points ? product.points.toFixed(2) : 'N/A'}
        </Text>
      </Group>

      {/* Stock Progress */}
      <Group justify="space-between" mb="xs">
        <Text size="sm" color="dimmed">Stock:</Text>
        <Text size="sm" color={product.stock > 0 ? "teal" : "red"}>
         {product.stock > 0 ? 'Item available' : 'Out of stock'}
        </Text>
      </Group>


      <Divider mb="xs" />

      {/* Add to Cart Button */}
      <Button
        fullWidth
        variant="light"
        color="blue"
        //leftIcon={<IconShoppingCart size={18} />}
        onClick={onClick}
        style={{
          marginTop: rem(10),
        }}
      >
        Add to Cart
      </Button>
    </Card>
  );
}
