import { useEffect, useState } from "react";
import { Table, Text, Select, TextInput, Badge, SegmentedControl } from "@mantine/core"; 
import { Voucher } from "../../types"; 

export default function Transactions() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [searchBy, setSearchBy] = useState<"user_id" | "product_id">("user_id"); 
  const [statusFilter, setStatusFilter] = useState<"all" | "claimed" | "valid">("all"); 

  useEffect(() => {
    // Adding two dummy vouchers for editing purpose
    const dummyVouchers: Voucher[] = [
      {
        id: "1",
        user_id: "user1",
        product_id: "prod1",
        points: 10,
        created_at: new Date().toISOString(),
        claimed_on: new Date().toISOString(),
      },
      {
        id: "2",
        user_id: "user2",
        product_id: "prod2",
        points: 20,
        created_at: new Date().toISOString(),
        claimed_on: "", // This voucher is not claimed
      },
    ];

    // Set the dummy vouchers state
    setVouchers(dummyVouchers);
    setFilteredVouchers(dummyVouchers); 
  }, []);

  // Helper function to format dates
  const formatDate = (date: any) => {
    if (!date) return "-";
    const newDate = new Date(date);
    return newDate.toLocaleDateString(); // Returns date in format "MM/DD/YYYY"
  };

  // Function to handle the search functionality
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterVouchers(term, statusFilter); 
  };

  // Function to filter vouchers by search term and status
  const filterVouchers = (term: string, status: "all" | "claimed" | "valid") => {
    let filtered = vouchers.filter((voucher) => {
      // Filter by search term
      if (searchBy === "user_id" && !voucher.user_id.toLowerCase().includes(term.toLowerCase())) {
        return false;
      }
      if (searchBy === "product_id" && !voucher.product_id.toLowerCase().includes(term.toLowerCase())) {
        return false;
      }

      return true; // Voucher passes search term checks
    });

    // Filter by status
    if (status === "claimed") {
      filtered = filtered.filter((voucher) => voucher.claimed_on !== "");
    } else if (status === "valid") {
      filtered = filtered.filter((voucher) => voucher.claimed_on === "");
    }

    setFilteredVouchers(filtered); // Update filtered vouchers
  };

  // Function to determine the status of the voucher
  const getStatus = (claimedOn: string) => {
    const badgeStyle = {
      display: "inline-block",
      margin: "auto",
      width: "80px", // Set a fixed width for consistent sizing
      textAlign: "center", // Center text within the badge
    };
  
    return claimedOn ? (
      <Badge color="gray" variant="outline" style={badgeStyle}>
        Claimed
      </Badge> // Grey for claimed vouchers
    ) : (
      <Badge color="blue" variant="outline" style={badgeStyle}>
        Valid
      </Badge> // Blue for valid vouchers
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Text size="xl" fw={700} mb="lg">
        Voucher List
      </Text>

      {/* Search bar and dropdown */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
  <Select
    value={searchBy}
    onChange={setSearchBy}
    data={[
      { value: "user_id", label: "Search by User ID" },
      { value: "product_id", label: "Search by Product ID" },
    ]}
    style={{ minWidth: "200px" }} // Ensure consistent width
  />
  <TextInput
    value={searchTerm}
    onChange={(e) => handleSearch(e.target.value)}
    placeholder="Search"
    style={{ flexGrow: 1, maxWidth: "300px" }} // Allow flexibility
  />
  <SegmentedControl
    value={statusFilter}
    onChange={(value) => {
      setStatusFilter(value as "all" | "claimed" | "valid");
      filterVouchers(searchTerm, value as "all" | "claimed" | "valid"); // Filter when status is changed
    }}
    data={[
      { label: "Claimed", value: "claimed" },
      { label: "All", value: "all" },
      { label: "Valid", value: "valid" },
    ]}
    style={{ flexShrink: 0 }} // Ensure consistent size
  />
</div>

      {/* Table displaying vouchers */}
      <Table striped highlightOnHover withColumnBorders>
        <thead style={{ backgroundColor: "#f5f7fa", borderRadius: "8px" }}>
          <tr>
            <th style={{ textAlign: "center" }}>Voucher ID</th>
            <th style={{ textAlign: "center" }}>User ID</th>
            <th style={{ textAlign: "center" }}>Product ID</th>
            <th style={{ textAlign: "center" }}>Points</th>
            <th style={{ textAlign: "center" }}>Claimed On</th>
            <th style={{ textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredVouchers.map((voucher) => (
            <tr key={voucher.id}>
              <td style={{ textAlign: "center" }}>{voucher.id}</td>
              <td style={{ textAlign: "center" }}>{voucher.user_id}</td>
              <td style={{ textAlign: "center" }}>{voucher.product_id}</td>
              <td style={{ textAlign: "center" }}>{voucher.points}</td>
              <td style={{ textAlign: "center" }}>{formatDate(voucher.claimed_on)}</td>
              <td style={{ textAlign: "center" }}>
                {getStatus(voucher.claimed_on)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
