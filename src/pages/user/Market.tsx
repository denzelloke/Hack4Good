import { useState } from 'react';
import { Container, Grid, Modal, Image, Text, Button, Notification} from '@mantine/core';
import { ProductCard } from '../../components/ProductCard';
import { SearchNav } from '../../components/SearchNav';
import { RecommendedFilters } from '../../components/RecommendedFilters';
import { Product } from '../../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';

// You'll want to move this to a separate file or fetch from an API
const products = [
  {
    id: '1',
    title: 'Chicken Cup Noodles',
    img: '/path-to-image',
    points: 1.50,
    category: 'Snacks',
  },
  {
    id: '2',
    title: 'Coca Cola',
    img: '/path-to-image',
    points: 1.70,
    category: 'Drinks',
  },
  {
    id: '3',
    title: 'Toothbrush',
    img: '/path-to-image',
    points: 2.00,
    category: 'Toiletries',
  },
  {
    id: '4',
    title: 'Ballpoint Pen',
    img: '/path-to-image',
    points: 1.00,
    category: 'Stationery',
  },
  {
    id: '5',
    title: 'Harry Potter Book',
    img: '/path-to-image',
    points: 8.00,
    category: 'Books',
  }
];



export default function Market() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
  
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

    const handleAddToCart = (product: Product) => {
      dispatch(addToCart(product));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  
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
              <Text mt="sm" size="md">Category: {selectedProduct.category}</Text>
              <Button mt="lg" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</Button>
              <Button mt="lg" onClick={closeModal}>Close</Button>
            </div>
          )}
        </Modal>

        {/* Cart Added Notification */}
      {showNotification && (
        <Notification
          title="Added to Cart"
          color="teal"
          onClose={() => setShowNotification(false)}
        >
          {selectedProduct?.title} has been added to your cart.
        </Notification>
      )}
    </Container> 
    );
  }