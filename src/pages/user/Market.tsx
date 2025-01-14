import { useState } from 'react';
import { Container, Grid, Modal, Image, Text, Button} from '@mantine/core';
import { ProductCard } from '../../components/ProductCard';
import { SearchNav } from '../../components/SearchNav';
import { RecommendedFilters } from '../../components/RecommendedFilters';
import { Product } from '../../types';

// You'll want to move this to a separate file or fetch from an API
const products: Product[] = [
  {
    id: '1',
    title: 'Oreos',
    img: '/path-to-image',
    price: 2.50,
    category: 'Snack',
  },
  {
    id: '2',
    title: 'Chicken Cup Noodles',
    img: '/path-to-image',
    price: 1.50,
    category: 'Snack',
  },
  {
    id: '3',
    title: 'Coca Cola',
    img: '/path-to-image',
    price: 1.70,
    category: 'Drink',
  },
  
  // Add more products...
];


export default function Market() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const filteredProducts = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || 
        product.category === selectedCategory
      return matchesSearch && matchesCategory;
    });

    const openModal = (product: Product) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
    };

    const closeModal =() => {
      setSelectedProduct(null);
      setIsModalOpen(false);
    };
  
    return (
      <Container size="xl" py="xl">
        <SearchNav 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        <RecommendedFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <Grid mt="xl">
          {filteredProducts.length == 0 ? (
            <div>
              No products found matching your criteria.
            </div>
          ) : (
          filteredProducts.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} onClick={() => openModal(product)} />
            </Grid.Col>
          ))
        )}
        </Grid>

        {/* Modal for Product Details */}
        <Modal opened={isModalOpen} onClose={closeModal} title={selectedProduct?.title}>
          {selectedProduct && (
            <div>
              <Image src={selectedProduct.img} alt={selectedProduct.title} />
              <Text mt="sm" size="md">
                Catergory: {selectedProduct.category}
              </Text>
              <Button mt="lg" onClick={closeModal}>
                Close
              </Button>
            </div>
          )}
        </Modal>
      </Container>
    );
  }