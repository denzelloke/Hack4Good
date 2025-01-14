import { useState } from 'react';
import { Container, Grid } from '@mantine/core';
import { ProductCard } from '../../components/ProductCard';
import { SearchNav } from '../../components/SearchNav';
import { RecommendedFilters } from '../../components/RecommendedFilters';
import { Product } from '../../types';

import { getAllProducts } from "../../db/database"

export default function MarketPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  getAllProducts().then(products => setProducts(products));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
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
