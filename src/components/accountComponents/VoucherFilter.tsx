import { Tabs, Title } from '@mantine/core';
import { IconSquareRoundedCheck, IconSquareRoundedX } from '@tabler/icons-react';

interface VoucherFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

export function VoucherFilter({setFilter }: VoucherFilterProps) {
  return (
    <div>
      <Title order={4} mt="xl" mb="md"
            style={{
              fontSize: '22px', 
              color: 'black', 
              textAlign: 'left', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              fontFamily: 'Arial, sans-serif', 
            }}
            >VOUCHER RECEIPTS</Title>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}></div>
            
      <Tabs 
      radius="md" 
      defaultValue="ALL"
      onChange={(value) => setFilter(value ?? 'ALL')}
      >
      <Tabs.List>
        <Tabs.Tab value="ALL">
        All Vouchers
        </Tabs.Tab>
        <Tabs.Tab value="VALID" leftSection={<IconSquareRoundedCheck size={12} />} color='#02f702' >
        Valid
        </Tabs.Tab>
        <Tabs.Tab value="CLAIMED" leftSection={<IconSquareRoundedX size={12} />} color='#ed2125' >
        Claimed  
        </Tabs.Tab>
      </Tabs.List>
      </Tabs>
    </div>
  );
}
