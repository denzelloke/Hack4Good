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
  // hover behavior
  const [hovered, setHovered] = useState(false);

  // modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  // handle card click for VALID vouchers
  const handleCardClick = () => {
    if (statusText === 'VALID') {
      setIsModalOpen(true); // Open modal
    }
  };

  //badge props
  const isValid = voucher.claimed_on == null;
  const badgeProps = isValid
    ? {
        variant: 'outline',
        color: '#008000',
        style: {
          outline: '3px solid #008000', // Custom thick green outline
          outlineOffset: '-1px',
        },
      }
    : {
        variant: 'filled',
        color: '#9e0808',
      };

    // card status and styles
    const statusText = isValid ? 'VALID' : 'CLAIMED';
    const backgroundColor = voucher.claimed_on == null ? '#caf2c2' : '#a6abab';


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
          <Card.Section>
          <Image
            src={getImageUrl(product.url)}
            height={100}
            width={100}
            alt={product.name}
            style={{
              objectFit: 'cover',
              borderRadius: rem(12),
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Card.Section>
        )}

        {/* Product Details */}                           
        <Box style={{ flex: 1 }}>
          <Text                                               //TODO: FIX THIS SHIT TOO
          style={{
            fontSize: rem(20) 
            }}
            > 
            {product?.name} 
          </Text>

          <Text 
          size="md"
          c="#1f2121"
          style={{
            fontSize: rem(16) 
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
          ...badgeProps.style, // Merge custom styles
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
        opened={isModalOpen}                    // modal visibility
        onClose={() => setIsModalOpen(false)}   // close modal
        title="Voucher Details"          
        size="md"
      >
        <Box>
          {product && (                          //AND FIX THIS SHIT TOO
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
              setIsModalOpen(false);       // claiming auto closes modal
            }}
          >
            CLAIM
          </Button>
        </Group>
      </Modal>
    </>
  );
}
