import { Modal, Image, Text, Button, Divider, } from '@mantine/core';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  return (
    <Modal opened={isOpen} onClose={onClose} title={product?.name}>
      {product && (
        <>
          {/* Product Image */}
          <Image src={product.img} alt={product.name} />

          {/* Product Information */}
          <Text mt="sm" size="md">
            <strong>Category:</strong> {product.category}
          </Text>

          {/* Product Description */}
          <Text mt="sm" size="sm">
            <strong>Description:</strong> {product.description}
          </Text>

          {/* Stock Information */}
          <Text mt="sm" size="sm">
            <strong>Stock Available:</strong> {product.stock} {product.stock > 1 ? 'items' : 'item'} left
          </Text>

          {/* Price */}
          <Text mt="sm" size="lg" color="green">
            <strong>Points:</strong> {product.points ? product.points.toFixed(2) : 'N/A'}
          </Text>

          <Divider my="sm" />

          {/* Add to Cart and Close Buttons */}
          <Button mt="lg" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
          <Button mt="lg" variant="outline" onClick={onClose}>
            Close
          </Button>
        </>
      )}
    </Modal>
  );
}
