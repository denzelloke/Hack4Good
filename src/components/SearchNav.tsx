import { TextInput, Group } from '@mantine/core';

interface SearchNavProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SearchNav({ searchQuery, onSearchChange }: SearchNavProps) {
  return (
    <Group justify="space-between">
      <TextInput
        placeholder="Search for ..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
        size="md"
        w={400}
      />
    </Group>
  );
}