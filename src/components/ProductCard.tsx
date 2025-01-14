import { Card, Image, Text, Group, Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card.Section>
        <Image src={product.img} height={160} alt={product.title} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.title}</Text>
        <Text fw={500} color="blue">
          ${product.price.toFixed(2)}
        </Text>
      </Group>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        <IconShoppingCart size={16} />
        Add to Cart
      </Button>
    </Card>
  );
}