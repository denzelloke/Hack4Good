import { useState } from 'react';
import { Container, Grid } from '@mantine/core';
import { ProductCard } from '../../components/ProductCard';
import { SearchNav } from '../../components/SearchNav';
import { RecommendedFilters } from '../../components/RecommendedFilters';
import { Product } from '../../types';

//This file and almost all its contents is directly ripped from the boilerplate site
//Will need changes to fit what we want, esp in our data fields:

const products: Product[] = [
  {
    id: '1',
    title: 'Nike Air Max',
    img: '/path-to-image',
    rating: 4.5,
    reviewCount: 123,
    prevPrice: 199.99,
    newPrice: 159.99,
    category: 'Nike',
    color: 'black',
    company: 'Nike',
  },
  // Add more products...
];

export default function MarketPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory ||
      product.category === selectedCategory ||
      product.company === selectedCategory ||
      product.color === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Container size="xl">
      <SearchNav
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <RecommendedFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Grid mt="xl">
        {filteredProducts.map((product) => (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={product} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
