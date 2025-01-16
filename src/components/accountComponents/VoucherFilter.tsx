import { Box, Select, Text } from '@mantine/core';

interface VoucherFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

export function VoucherFilter({ filter, setFilter }: VoucherFilterProps) {
  return (
    <Box
      mt="lg"
      style={{
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Text size="lg" mb="sm">
        Filter Vouchers:
      </Text>
      <Select
        placeholder="Select a filter"
        data={[
          { value: 'ALL', label: 'All Vouchers' },
          { value: 'VALID', label: 'Valid' },
          { value: 'CLAIMED', label: 'Claimed' },
        ]}
        value={filter}
        onChange={(value) => setFilter(value ?? 'ALL')}
      />
    </Box>
  );
}
