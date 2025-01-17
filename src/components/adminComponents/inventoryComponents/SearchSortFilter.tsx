import React from "react";
import { Select, Switch, Button, Group, Text } from "@mantine/core";

interface SearchSortFilter {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  showInStock: boolean;
  setShowInStock: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPoints: boolean;
  setSortByPoints: React.Dispatch<React.SetStateAction<boolean>>;
  categories: string[];
}

const SearchSortFilter: React.FC<SearchSortFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  showInStock,
  setShowInStock,
  sortByPoints,
  setSortByPoints,
  categories,
}) => {
  return (
    <Group position="apart" style={{ marginBottom: "20px" }}>
      {/* Category Filter */}
      <Select
        label="Filter by Category"
        value={selectedCategory}
        onChange={setSelectedCategory}
        data={[{ value: "", label: "All" }, ...categories.map((category) => ({ value: category, label: category }))]}
        style={{ width: "200px" }}
      />

      {/* In Stock Filter */}
      <Group position="center">
        <Text>Show In-Stock Items</Text>
        <Switch checked={showInStock} onChange={(event) => setShowInStock(event.currentTarget.checked)} />
      </Group>

      {/* Sort by Points */}
      <Button onClick={() => setSortByPoints((prev) => !prev)}>
        Sort by Points {sortByPoints ? "(Descending)" : ""}
      </Button>
    </Group>
  );
};

export default SearchSortFilter;
