import { useState, useEffect } from "react";
import { Product } from "../../types";
import { getAllProducts } from "../../backend/database";
import InventoryProduct from "../../components/adminComponents/inventoryComponents/InventoryProduct";
import SearchSortFilter from "../../components/adminComponents/inventoryComponents/SearchSortFilter";
import InventoryTable from "../../components/adminComponents/inventoryComponents/InventoryTable";

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]); // Initializing with an empty array
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openedModal, setOpenedModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stockFilter, setStockFilter] = useState<string>("all"); // Default to "All"
  const [sortOption, setSortOption] = useState<string>("none");

  useEffect(() => {
    // Fetch products from the database
    getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    // Filter products based on category, stock, and sort by criteria
    let filtered = [...products];

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by stock status
    if (stockFilter === "in-stock") {
      filtered = filtered.filter((product) => product.stock > 0);
    } else if (stockFilter === "out-of-stock") {
      filtered = filtered.filter((product) => product.stock === 0);
    }

    // Sort products based on selected sort option
    switch (sortOption) {
      case "points-asc":
        filtered.sort((a, b) => a.points - b.points); // Ascending by points
        break;
      case "points-desc":
        filtered.sort((a, b) => b.points - a.points); // Descending by points
        break;
      case "stock-asc":
        filtered.sort((a, b) => a.stock - b.stock); // Ascending by stock
        break;
      case "stock-desc":
        filtered.sort((a, b) => b.stock - a.stock); // Descending by stock
        break;
      default:
        break; // "none" does not sort
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, stockFilter, sortOption, products]); // Re-run when any of these values change

  // Get unique categories for filter options
  const categories = Array.from(new Set(products.map((product) => product.category)));

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenedModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenedModal(false);
  };

  // Function to restock the product
  const handleRestock = (product: Product, change: number) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, stock: change } : p
    );
    setProducts(updatedProducts);
  };

  // Function to delete the product
  //LINK TO DATABASE HERE
  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts); // Update the state by removing the product
  };

  return (
    <div>
      <SearchSortFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categories={categories}
      />
      <InventoryTable
        filteredProducts={filteredProducts}
        handleOpenModal={handleOpenModal}
        handleRestock={handleRestock}
        handleDelete={handleDelete}
      />
      {openedModal && selectedProduct && (
        <InventoryProduct opened={openedModal} onClose={handleCloseModal} product={selectedProduct} />
      )}
    </div>
  );
}
