import { useEffect, useState } from "react";
import { Table, Select, TextInput, Badge, SegmentedControl } from "@mantine/core";
import { getTransactionDetail } from "../../backend/database"; // Updated import

export default function Transactions() {
  const [vouchers, setVouchers] = useState<any[]>([]); // Updated for joined data
  const [filteredVouchers, setFilteredVouchers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [searchBy, setSearchBy] = useState<"username" | "product_name">("username"); // Updated search fields
  const [statusFilter, setStatusFilter] = useState<"all" | "claimed" | "valid">("all");

  useEffect(() => {
    async function fetchTransactionDetails() {
      try {
        const transactionDetails = await getTransactionDetail(); // Fetch joined data
        setVouchers(transactionDetails);
        setFilteredVouchers(transactionDetails); // Initialize with all vouchers
      } catch (error) {
        console.error("Failed to fetch transaction details:", error);
      }
    }

    fetchTransactionDetails();
  }, []);

  // Helper function to format dates
  const formatDate = (date: any) => {
    if (!date) return "-";
    const newDate = new Date(date);
    return newDate.toLocaleDateString(); // Returns date in format "MM/DD/YYYY"
  };

  // Handle search and status filters
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterVouchers(term, statusFilter);
  };

  const filterVouchers = (term: string, status: "all" | "claimed" | "valid") => {
    let filtered = vouchers.filter((voucher) => {
      // Search by username or product_name
      if (searchBy === "username" && !voucher.users.username.toLowerCase().includes(term.toLowerCase())) {
        return false;
      }
      if (searchBy === "product_name" && !voucher.products.name.toLowerCase().includes(term.toLowerCase())) {
        return false;
      }
      return true;
    });

    // Filter by status
    if (status === "claimed") {
      filtered = filtered.filter((voucher) => voucher.claimed_on !== null && voucher.claimed_on !== "");
    } else if (status === "valid") {
      filtered = filtered.filter((voucher) => !voucher.claimed_on);
    }

    setFilteredVouchers(filtered);
  };

  return (
    <div>
      {/* Filter Controls */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
        <Select
          value={searchBy}
          onChange={(value) => setSearchBy(value as "username" | "product_name")}
          data={[
            { value: "username", label: "Search by Username" },
            { value: "product_name", label: "Search by Product Name" },
          ]}
        />
        <TextInput
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
          style={{ width: "250px" }}
        />
        <SegmentedControl
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter(value as "all" | "claimed" | "valid");
            filterVouchers(searchTerm, value as "all" | "claimed" | "valid");
          }}
          data={[
            { label: "Claimed", value: "claimed" },
            { label: "All", value: "all" },
            { label: "Valid", value: "valid" },
          ]}
        />
      </div>

      {/* Table */}
      <Table striped
        highlightOnHover
        verticalSpacing="md"
        horizontalSpacing="lg"
        style={{
          width: "100%",
          tableLayout: "fixed",
        }}>
        <thead style={{ backgroundColor: "#f5f7fa", borderRadius: "8px" }}>
          <tr
          >
            <th>User</th>
            <th>Product</th>
            <th>Points</th>
            <th>Claimed On</th>
            <th>Status</th>
          </tr>
        </thead >
        <tbody >
          {filteredVouchers.map((voucher, index) => (
            <tr key={voucher.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
              <td style={{ textAlign: "center", padding: "8px 12px" }}>{voucher.users.username}</td>
              <td style={{ textAlign: "center", padding: "8px 12px" }}>{voucher.products.name}</td>
              <td style={{ textAlign: "center", padding: "8px 12px" }}>{voucher.points}</td>
              <td style={{ textAlign: "center", padding: "8px 12px" }}>{formatDate(voucher.claimed_on)}</td>
              <td style={{ textAlign: "center", padding: "8px 12px" }}>
                {voucher.claimed_on ? (
                  <Badge
                  size="md"
                  color="gray"
                  variant="outline"
                  style={{ width: "80px", textAlign: "center" }} // Fixed width and centered text
                >
                  Claimed
                </Badge>
                ) : (
                <Badge
                  size="sm"
                  color="blue"
                  variant="outline"
                  style={{ width: "80px", textAlign: "center" }} // Fixed width and centered text
                >
                  Valid
                </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
