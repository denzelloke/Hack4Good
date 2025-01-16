import { Modal, Image, Text, Button, Divider, Group, } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector((state: any) => state.cart.items);
  const currentProductQuantityInCart = cart.reduce(
    (total: number, item: any) => (item.id === product?.id ? total + item.quantity : total),
    0
  );

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity);
      setAddedToCart(true);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock && quantity + currentProductQuantityInCart < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleContinueShopping = () => {
    setAddedToCart(false);
    onClose();
  };

  const handleViewBag = () => {
    navigate('/cart');
  };

  if (!product) {
    return null;
  }

  const maxQuantityAllowed = product.stock - currentProductQuantityInCart;

  return (
    <Modal opened={isOpen} onClose={handleContinueShopping} title={product.name} size="lg">
      {addedToCart ? (
        <>
          <Text size="lg" fw={500} color="teal">
            {quantity} {product.name} added to cart
          </Text>
          <Image
            src={product.img}
            alt={product.name}
            style={{
              border: '5px solid #007bff', 
              borderRadius: '10px', 
              padding: '5px', 
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
            }}
          />
          <Text size="sm">{product.description}</Text>
          <Divider my="sm" />
          <Group justify="space-between">
            <Button onClick={handleContinueShopping} style={{ flex: 1, marginRight: '8px', transition: 'transform 0.2s ease' }}>Continue Shopping</Button>
            <Button variant="outline" onClick={handleViewBag} style={{ flex: 1, marginLeft: '8px', transition: 'transform 0.2s ease' }}>
              View Bag & Checkout
            </Button>
          </Group>
        </>
      ) : (
        <>
          <Image
            src={product.img}
            alt={product.name}
            style={{
              border: '5px solid #f1f1f1', 
              borderRadius: '10px', 
              padding: '5px', 
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
            }}
          />
          <Text mt="sm" size="lg" fw={700} style={{ color: '#333', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {product.name}
          </Text>
          <Text mt="sm" size="md" style={{ fontStyle: 'italic' }}>
            <strong>Category:</strong> {product.category}
          </Text>
          <Text mt="sm" size="sm">
            <strong>Description:</strong> {product.description}
          </Text>
          <Text mt="sm" size="sm">
            <strong>Stock Available:</strong> {product.stock} {product.stock > 1 ? 'items' : 'item'} left
          </Text>
          <Text mt="sm" size="lg" color="green">
            <strong>Points:</strong> {product.points ? product.points : 'N/A'}
          </Text>
          <Divider my="sm" />

          <Group mt="sm" align="center">
            <Button
              variant="outline"
              size="xs"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              style={{ transition: 'transform 0.2s ease' }}
            >
              -
            </Button>
            <Text size="md" fw={500}>{quantity}</Text>
            <Button
              variant="outline"
              size="xs"
              onClick={incrementQuantity}
              disabled={quantity >= maxQuantityAllowed}
              style={{ transition: 'transform 0.2s ease' }}
            >
              +
            </Button>
          </Group>

          <Divider my="sm" />

          <Group mt="sm" justify="space-between">
          {quantity <= maxQuantityAllowed? (
            <Group mt="sm" grow>
            <Button
              variant="light"
              style={{
                marginleft: '8px',
                height: '40px',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={handleAddToCart}
              
            >
              Add to Cart
            </Button>
          </Group>
          ) : (
            <Group mt="sm" grow>
            <Button
              fullWidth
              variant="light"
              disabled
              style={{
                marginLeft: '8px',
                height: '40px',
                fontWeight: 700,
                color: '#999',
                backgroundColor: '#f1f1f1',
                borderColor: '#f1f1f1',
              }}
            >
              Max Quantity Added
            </Button>
          </Group>
          )}
          <Button 
            mt="lg" 
            variant="outline" 
            onClick={onClose}
            style={{
            marginRight: '8px',
            height: '40px',
            }}
            >
            Close
          </Button>
          </Group>
          
        </>
      )}
    </Modal>
  );
}
