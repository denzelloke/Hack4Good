import React from "react";
import { Select, SegmentedControl, Group, Text, Badge, ScrollArea } from "@mantine/core";

interface SearchSortFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  stockFilter: string;
  setStockFilter: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
}

const SearchSortFilter: React.FC<SearchSortFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  stockFilter,
  setStockFilter,
  sortOption,
  setSortOption,
  categories,
}) => {
  return (
    <Group justify="apart" style={{ marginBottom: "10px", flexWrap: "wrap" }} spacing="md">
      {/* Category Filter Bar */}
      <ScrollArea style={{ maxWidth: "65%" }} offsetScrollbars>
        <Group spacing="sm" noWrap>
          <Badge
            onClick={() => setSelectedCategory(null)}
            color={!selectedCategory ? "blue" : "gray"}
            variant="filled"
            style={{ cursor: "pointer" }}
          >
            All Products
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? "blue" : "gray"}
              variant="filled"
              style={{ cursor: "pointer" }}
            >
              {category}
            </Badge>
          ))}
        </Group>
      </ScrollArea>

      {/* Stock Filter */}
      <SegmentedControl
        value={stockFilter}
        onChange={setStockFilter}
        data={[
          { label: "Not In Stock", value: "not_in_stock" },
          { label: "All", value: "all" },
          { label: "In Stock", value: "in_stock" },
        ]}
        style={{ maxWidth: "20%" }}
      />

      {/* Sort Options */}
      <Select
        placeholder="Sort Options"
        value={sortOption}
        onChange={setSortOption}
        data={[
          { value: "", label: "None" },
          { value: "points_asc", label: "Ascending Points" },
          { value: "points_desc", label: "Descending Points" },
          { value: "stock_asc", label: "Ascending Stock" },
          { value: "stock_desc", label: "Descending Stock" },
        ]}
        style={{ maxWidth: "15%" }}
      />
    </Group>
  );
};

export default SearchSortFilter;
