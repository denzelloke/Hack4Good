import { Card, Image, Text, Badge, Group, Button } from '@mantine/core';
import { IconHeart, IconShoppingCart } from '@tabler/icons-react';
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
          alt={product.title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.title}</Text>
        <Badge color="yellow" variant="light">
          {product.rating} ★ ({product.reviewCount})
        </Badge>
      </Group>

      <Group justify="space-between" mt="md">
        <div>
          <Text size="sm" td="line-through" c="dimmed">
            ${product.prevPrice}
          </Text>
          <Text size="lg" fw={500} c="blue">
            ${product.newPrice}
          </Text>
        </div>
        <Group>
          <Button variant="light" color="gray" size="sm">
            <IconHeart size={16} />
          </Button>
          <Button variant="light" color="blue" size="sm">
            <IconShoppingCart size={16} />
          </Button>
        </Group>
      </Group>
    </Card>
  );
}