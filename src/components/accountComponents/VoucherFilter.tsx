import { Tabs } from '@mantine/core';
import { IconSquareRoundedCheck, IconSquareRoundedX } from '@tabler/icons-react';

interface VoucherFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

export function VoucherFilter({setFilter }: VoucherFilterProps) {
  return (
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
  );
}
