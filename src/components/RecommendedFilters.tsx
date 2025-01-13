import { Group, Button, Title } from '@mantine/core';

interface RecommendedFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function RecommendedFilters({ 
  selectedCategory, 
  onCategoryChange 
}: RecommendedFiltersProps) {
  const categories = ['Nike', 'Adidas', 'Puma', 'Vans'];

  return (
    <div>
      <Title order={4} mt="xl" mb="md">Recommended</Title>
      <Group>
        <Button 
          variant={!selectedCategory ? 'filled' : 'light'}
          onClick={() => onCategoryChange(null)}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'filled' : 'light'}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </Group>
    </div>
  );
}
