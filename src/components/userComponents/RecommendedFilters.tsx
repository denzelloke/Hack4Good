import { Button, Title, Text } from '@mantine/core';
import { IconCookie, IconBottle, IconBasket, IconPencil, IconBook, IconBox } from '@tabler/icons-react'; // Import relevant icons

interface RecommendedFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function RecommendedFilters({ 
  selectedCategory, 
  onCategoryChange 
}: RecommendedFiltersProps) {
  const categories = [
    { name: 'Snacks', icon: <IconCookie size={24} /> },  // Using IconCookie for Snacks
    { name: 'Drinks', icon: <IconBottle size={24} /> },  // Using IconBottle for Drinks
    { name: 'Toiletries', icon: <IconBasket size={24} /> },  // Using IconBasket for Toiletries
    { name: 'Stationery', icon: <IconPencil size={24} /> },  // Using IconPencil for Stationery
    { name: 'Books', icon: <IconBook size={24} /> }  // Using IconBook for Books
  ];

  return (
    <div>
      <Title order={4} mt="xl" mb="md"
      style={{
        fontSize: '22px', // Make the font size larger
        color: 'black', // A strong color for the title
        textAlign: 'left', // Center the title
        letterSpacing: '1px', // Add slight spacing between letters for a more refined look
        textTransform: 'uppercase', // Make the text uppercase for emphasis
        fontFamily: 'Arial, sans-serif', // Use a clean, modern font
      }}
      >CATEGORIES</Title>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Button 
          variant={!selectedCategory ? 'filled' : 'light'}
          onClick={() => onCategoryChange(null)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <IconBox size={24} /> {/* Default icon for 'All Products' */}
          <Text>All Products</Text>
        </Button>

        {categories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? 'filled' : 'light'}
            onClick={() => onCategoryChange(category.name)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {category.icon} {/* Display the specific icon for each category */}
            <Text>{category.name}</Text>
          </Button>
        ))}
      </div>
    </div>
  );
}
