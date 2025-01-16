import { Card, Box, Text } from '@mantine/core';
import { Product, Voucher } from '../../types';

interface VoucherCardProps {
  voucher: Voucher;
  product: Product | undefined;
  isExpired: (expiredAt: number) => boolean;
}

export function VoucherCard({ voucher, product, isExpired }: VoucherCardProps) {
  let statusText = '';
  let backgroundColor = '';

  if (voucher.is_claimed) {
    statusText = 'CLAIMED';
    backgroundColor = '#f5bc5b';
  } else if (isExpired(voucher.expired_at)) {
    statusText = 'EXPIRED';
    backgroundColor = '#f29f99';
  } else {
    statusText = 'VALID';
    backgroundColor = '#94f78b';
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
        <Text size="md">{product?.name}</Text>
        <Text size="sm">Purchased: {new Date(voucher.created_at).toLocaleString()}</Text>
        <Text size="sm">Expires On: {new Date(voucher.expired_at).toLocaleString()}</Text>
        <Text size="sm">Voucher ID: {voucher.id}</Text>
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
        }}
      >
        {statusText}
      </Text>
    </Card>
  );
}
