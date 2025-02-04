import { Button, Text } from '@mantine/core';
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
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: "20px" }}>
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
