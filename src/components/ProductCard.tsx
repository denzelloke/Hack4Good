import { Card, Image, Text, Group } from '@mantine/core';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={product.img}
          height={160}
          alt={product.name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.name}</Text>
      </Group>
    </Card>
  );
}