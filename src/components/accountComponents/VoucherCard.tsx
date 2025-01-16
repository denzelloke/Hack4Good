import { Card, Box, Text, rem, Modal, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { Product, Voucher } from '../../types';

interface VoucherCardProps {
  voucher: Voucher;
  product: Product | undefined;
}

export function VoucherCard({ voucher, product }: VoucherCardProps) {
  // hover behavior
  const [hovered, setHovered] = useState(false);

  // modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // card status and styles
  const statusText = voucher.claimed_on == null ? 'VALID' : 'CLAIMED';
  const backgroundColor = voucher.claimed_on == null ? '#b2edc0' : 'grey';

  // handle card click for VALID vouchers
  const handleCardClick = () => {
    if (statusText === 'VALID') {
      setIsModalOpen(true); // Open modal
    }
  };

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
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
          borderRadius: rem(15),
          cursor: statusText === 'VALID' ? 'pointer' : 'default',                    // only VALID got pointer
          transform: hovered && statusText === 'VALID' ? 'scale(1.05)' : 'scale(1)', // enlarge on hover if VALID
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',                   // hover transition
          boxShadow: hovered && statusText === 'VALID'
            ? '0 12px 24px rgba(0, 0, 0, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',                                      // shadow effect for hover
        }}
        onMouseEnter={() => statusText === 'VALID' && setHovered(true)}                // trigger hover
        onMouseLeave={() => setHovered(false)}                                         // reset hover state
        onClick={handleCardClick}                                                      // open modal on click for VALID
      >
        {/* Product Image */}
        {product && (
          <Box
            style={{
              width: '100px',
              height: '100px',
              backgroundImage: `url(${product.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginRight: '16px',
            }}
          />
        )}

        {/* Product Details */}
        <Box style={{ flex: 1 }}>
          <Text size="lg">{product?.name}</Text>
          <Text size="sm">Purchased: {new Date(voucher.created_at).toLocaleString()}</Text>
        </Box>

        {/* Status Text */}
        <Text
          size="lg"
          style={{
            position: 'absolute',
            right: '16px',
            textAlign: 'center',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'black',
          }}
        >
          {statusText}
        </Text>
      </Card>

      {/* Modal for VALID vouchers */}
      <Modal
        opened={isModalOpen}                    // modal visibility
        onClose={() => setIsModalOpen(false)}   // close modal
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
              console.log('Voucher claimed!'); // TODO: IMPLEMENT CLAIMED LOGIC
              setIsModalOpen(false);           // claiming auto closes modal
            }}
          >
            CLAIM
          </Button>
        </Group>
      </Modal>
    </>
  );
}
