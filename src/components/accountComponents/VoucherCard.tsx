import { Card, Box, Text, rem,  } from '@mantine/core';
import { Product, Voucher } from '../../types';

interface VoucherCardProps {
  voucher: Voucher;
  product: Product | undefined;
}

export function VoucherCard({ voucher, product }: VoucherCardProps) {
  let statusText = '';
  let backgroundColor = '';

 if (voucher.claimed_on == null) {
    statusText = 'VALID';
    backgroundColor = '#b2edc0';
  } 
  else {
    statusText = 'CLAIMED';
    backgroundColor = 'grey';
  }

 
  return (
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
      }}
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
          size: 'xl',
          color: 'black',
        }}
      >
        {statusText}
      </Text>
    </Card>
  );
}
