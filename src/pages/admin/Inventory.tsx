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
  const [showInStock, setShowInStock] = useState(false);
  const [sortByPoints, setSortByPoints] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch products from the database
    getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    // Filter products based on category, stock, and sort by points
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (showInStock) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    // Sort products by points if required
    if (sortByPoints) {
      filtered = filtered.sort((a, b) => b.points - a.points); // Sorting in descending order
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, showInStock, sortByPoints, products]); // Re-run when any of these values change

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
  //LINK TO DATABASE HERE
  const handleRestock = (product: Product, change: number) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, stock: p.stock + change } : p
    );
    setProducts(updatedProducts); // Update the state with the new stock
  };

  // Function to delete the product
  //LINK TO DATABASE HERE
  const handleDelete = (productId: string) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts); // Update the state by removing the product
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Filters and Sorting */}
      <SearchSortFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showInStock={showInStock}
        setShowInStock={setShowInStock}
        sortByPoints={sortByPoints}
        setSortByPoints={setSortByPoints}
        categories={categories}
      />

      {/* Inventory Table with new functions */}
      <InventoryTable
        filteredProducts={filteredProducts}
        handleOpenModal={handleOpenModal}
        handleRestock={handleRestock}
        handleDelete={handleDelete}
      />

      {/* Inventory Product Modal */}
      <InventoryProduct opened={openedModal} onClose={handleCloseModal} product={selectedProduct} />
    </div>
  );
}
