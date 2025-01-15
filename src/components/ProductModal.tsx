import { Modal, Image, Text, Button, Divider, Group } from '@mantine/core';
import { useState } from 'react';
import { Product } from '../types';
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
  const [addedToCart, setAddedToCart] = useState(false); // State to track if item is added
  const navigate = useNavigate();

  // Get the cart state to calculate the quantity of the product in the cart
  const cart = useSelector((state: any) => state.cart.items);
  const currentProductQuantityInCart = cart.reduce(
    (total: number, item: any) => (item.id === product?.id ? total + item.quantity : total),
    0
  );

  // Handle Add to Cart action
  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity); // Add product to cart
      setAddedToCart(true); // Show confirmation screen
    }
  };

  // Adjust quantity handlers
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

  // Continue shopping or go to cart
  const handleContinueShopping = () => {
    setAddedToCart(false); // Reset confirmation screen
    onClose();
  };

  const handleViewBag = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  if (!product) {
    return null; // Don't render anything if the product is not available
  }

  // Calculate the max quantity user can add to the cart based on available stock and what they already have in the cart
  const maxQuantityAllowed = product.stock - currentProductQuantityInCart;

  return (
    <Modal opened={isOpen} onClose={onClose} title={product.name}>
      {addedToCart ? (
        // Confirmation screen after adding to cart
        <>
          <Text size="lg" fw={500} color="teal">
            {quantity} {product.name} added to cart
          </Text>
          <Image src={product.img} alt={product.name} />
          <Text size="sm">{product.description}</Text>
          <Divider my="sm" />
          <Group justify="space-between">
            <Button onClick={handleContinueShopping}>Continue Shopping</Button>
            <Button variant="outline" onClick={handleViewBag}>
              View Bag & Checkout
            </Button>
          </Group>
        </>
      ) : (
        // Product details and quantity selector before adding to cart
        <>
          <Image src={product.img} alt={product.name} />
          <Text mt="sm" size="md">
            <strong>Category:</strong> {product.category}
          </Text>
          <Text mt="sm" size="sm">
            <strong>Description:</strong> {product.description}
          </Text>
          <Text mt="sm" size="sm">
            <strong>Stock Available:</strong> {product.stock}{' '}
            {product.stock > 1 ? 'items' : 'item'} left
          </Text>
          <Text mt="sm" size="lg" color="green">
            <strong>Points:</strong> {product.points ? product.points.toFixed(2) : 'N/A'}
          </Text>
          <Divider my="sm" />

          <Group mt="sm" align="center">
            <Button
              variant="outline"
              size="xs"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <Text size="md" fw={500}>
              {quantity}
            </Text>
            <Button
              variant="outline"
              size="xs"
              onClick={incrementQuantity}
              disabled={quantity >= maxQuantityAllowed}
            >
              +
            </Button>
          </Group>

          <Divider my="sm" />

          {/* Add to Cart and Close Buttons */}
          {quantity <= maxQuantityAllowed ? (
            <Button mt="lg" onClick={handleAddToCart}>
              Add {quantity} to Cart
            </Button>
          ) : (
            <Button mt="lg" disabled>
              Max Quantity Added
            </Button>
          )}
          <Button mt="lg" variant="outline" onClick={onClose}>
            Close
          </Button>
        </>
      )}
    </Modal>
  );
}
