import { useEffect, useState } from "react";
import { getVoucher } from "../../backend/database";
import { Table, Text } from "@mantine/core"; // Import Mantine's Table component
import { Voucher } from "../../types"; // Assuming you have a Voucher type

export default function Transactions() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    // Fetch vouchers from the database
    getVoucher().then((voucherList) => {
      setVouchers(voucherList); // Setting the correct state with fetched data
    });
  }, []);

  // Helper function to format dates (optional)
  const formatDate = (date: any) => {
    if (!date) return "-";
    const newDate = new Date(date);
    return newDate.toLocaleDateString(); // Returns date in format "MM/DD/YYYY"
  };

  return (
    <div style={{ padding: "20px" }}>
      <Text size="xl" fw={700} mb="lg">
        Voucher List
      </Text>
      <Table striped highlightOnHover>
        <thead style={{ backgroundColor: "#f5f7fa", borderRadius: "8px" }}>
          <tr>
            <th>Voucher ID</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Points</th>
            <th>Created At</th>
            <th>Claimed On</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.id}</td>
                <td>{voucher.user_id}</td>
                <td>{voucher.product_id}</td>
                <td>{voucher.points}</td>
                <td>{formatDate(voucher.created_at)}</td>
                <td>{formatDate(voucher.claimed_on)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No vouchers available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
