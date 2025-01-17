import { Card, Box, Text, rem, Modal, Button, Group, Badge, Image } from '@mantine/core';
import { useState } from 'react';
import { claimVoucher } from '../../../backend/database';
import { Product, Voucher } from '../../../types';
import { getImageUrl } from '../../../backend/storage';

interface VoucherCardProps {
  voucher: Voucher;
  product: Product | undefined;
}

export function VoucherCard({ voucher, product }: VoucherCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (statusText === 'VALID') {
      setIsModalOpen(true);
    }
  };

  const isValid = voucher.claimed_on == null;
  const badgeProps = isValid
    ? {
        variant: 'outline',
        color: '#008000',
        style: {
          outline: '3px solid #008000',
          outlineOffset: '-1px',
        },
      }
    : {
        variant: 'filled',
        color: '#9e0808',
      };

  const statusText = isValid ? 'VALID' : 'CLAIMED';
  const backgroundColor = isValid ? '#caf2c2' : '#a6abab';

  return (
    <>
      {/* Card for voucher */}
      <Card
        key={voucher.id}
        shadow="sm"
        p="lg"
        style={{
          backgroundColor,
          color: 'black',
          marginBottom: '10px',
          display: 'flex',
          flexDirection: 'row', // Ensures image and details are side-by-side
          alignItems: 'center',
          position: 'relative',
          borderRadius: rem(15),
          cursor: statusText === 'VALID' ? 'pointer' : 'default',
          transform: hovered && statusText === 'VALID' ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hovered && statusText === 'VALID'
            ? '0 12px 24px rgba(0, 0, 0, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
        onMouseEnter={() => statusText === 'VALID' && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleCardClick}
      >
        {/* Product Image */}
        {product && (
          <Box
            style={{
              width: '120px', // Adjust image dimensions as needed
              height: '120px',
              backgroundColor: 'white', // White background
              border: '1px solid black', // Black border
              borderRadius: rem(12),
              overflow: 'hidden', // Crop to square
              flexShrink: 0, // Prevent the image from resizing
              marginRight: '16px', // Space between image and details
            }}
          >
            <Image
              src={getImageUrl(product.url)}
              alt={product.name}
              height="100%"
              width="100%"
              style={{
                objectFit: 'cover', // Maintain aspect ratio and crop excess
              }}
            />
          </Box>
        )}

        {/* Product Details */}
        <Box style={{ flex: 1 }}> {/* Takes up remaining space */}
          <Text
            style={{
              fontSize: rem(20),
              fontWeight: 'bold',
              marginBottom: '8px', // Space between title and other details
            }}
          >
            {product?.name}
          </Text>

          <Text
            size="md"
            c="#1f2121"
            style={{
              fontSize: rem(16),
            }}
          >
            Purchased: {new Date(voucher.created_at).toLocaleString()}
          </Text>
        </Box>

        {/* Status Badge */}
        <Badge
          {...badgeProps}
          radius="sm"
          size="xl"
          style={{
            ...badgeProps.style,
            position: 'absolute',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontWeight: 60,
          }}
        >
          {statusText}
        </Badge>
      </Card>

      {/* Modal for VALID vouchers */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Voucher Details"
        size="md"
      >
        <Box>
          {product && (
            <>
              <Text size="lg" fw={700}>{product.name}</Text>
              <Text size="sm"><strong>Category:</strong> {product.category}</Text>
              <Text size="sm"><strong>Description:</strong> {product.description}</Text>
              <Text size="sm"><strong>Points:</strong> {product.points}</Text>
              <Text size="sm"><strong>Stock:</strong> {product.stock}</Text>
            </>
          )}
        </Box>
        <Group mt="lg" justify="center">
          <Button
            size="lg"
            color="blue"
            style={{
              marginTop: rem(20),
              height: rem(50),
              fontWeight: 700,
            }}
            onClick={() => {
              voucher.claimed_on = Date(); // TODO: LINK TO DATABASE 
              claimVoucher(voucher.id);
              setIsModalOpen(false);
            }}
          >
            CLAIM
          </Button>
        </Group>
      </Modal>
    </>
  );
}
