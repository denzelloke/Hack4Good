import { useState, useEffect } from 'react';
import { Container, Grid, Text, Modal, Button, Box } from '@mantine/core';
import { ProductCard } from '../../components/ProductCard';
import { SearchNav } from '../../components/SearchNav';
import { RecommendedFilters } from '../../components/RecommendedFilters';
import { Product } from '../../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import { ProductModal } from '../../components/ProductModal';
import { ProductRequestForm } from '../../components/RequestForm';

import { getAllProducts } from "../../backend/database";


export default function Market() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    getAllProducts().then((products) => setProducts(products));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if(a.stock > 0 && b.stock <= 0) return -1;
    if(b.stock > 0 && a.stock <= 0) return 1;
    return 0;
  })

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const openRequestModal = () => setIsRequestModalOpen(true);
  const closeRequestModal = () => setIsRequestModalOpen(false);

  return (
    <Container size="xl" py="xl">
      <SearchNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <RecommendedFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Grid mt="xl">
        {sortedProducts.length === 0 ? (
          <Text>No products found matching your criteria.</Text>
        ) : (
          filteredProducts.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} onClick={() => openModal(product)} />
            </Grid.Col>
          ))
        )}
      </Grid>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddToCart={handleAddToCart}
      />

      {/* Request From Modal */}
      <Modal 
      opened={isRequestModalOpen}
      onClose={closeRequestModal}
      title="Request a Product"
      size="lg"
      >
        <ProductRequestForm onSubmit={(data) => {
          //Handle submission
          console.log('Product request data:', data);
          closeRequestModal();
        }} />
      </Modal>

      {/* Request Button */} 
      <Box style={{ position: 'fixed', bottom: '30px', right: '30px' }}>
        <Button
        onClick={openRequestModal}
        variant="filled"
        color="blue"
        >
          Request a Product
        </Button>
      </Box>
    </Container>
  );
}
