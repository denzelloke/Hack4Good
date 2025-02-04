import { useState, useEffect } from "react";
import { Table, Loader, Text, Button, Center, TextInput } from "@mantine/core"; // Import TextInput
import { getStudentUsers } from "../../backend/database";
import { User } from "../../types";
import { updateUserPoints } from "../../backend/database";
import AdjustPointsModal from "../../components/adminComponents/people/AdjustPointModal"; // Import the modal component

export default function People() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalUser, setModalUser] = useState<User | null>(null); // Track the user for the modal
  const [search, setSearch] = useState<string>(""); // State to hold the search query

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getStudentUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Loader />
      </div>
    );
  }

  const handleAdjustPoints = (user: User) => {
    setModalUser(user); // Open the modal for the selected user
  };

  return (
    <div style={{ padding: "20px" }}>
      <Text size="xl" fw={600} align="center" mb="md">
        Users
      </Text>
      
      {/* Search Bar */}
      <TextInput
        placeholder="Search by username"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search state on input change
        style={{ marginBottom: "20px" }}
      />

      <Table
        striped
        highlightOnHover
        verticalSpacing="md"
        horizontalSpacing="lg"
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 10px",
        }}
      >
        <thead style={{ backgroundColor: "#f5f7fa", borderRadius: "8px" }}>
          <tr>
            <th style={{ padding: "10px 16px" }}>ID</th>
            <th style={{ padding: "10px 16px" }}>Username</th>
            <th style={{ padding: "10px 16px" }}>Points</th>
            <th style={{ padding: "10px 16px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <td style={{ padding: "10px 16px" }}>{user.id}</td>
                <td style={{ padding: "10px 16px" }}>{user.username}</td>
                <td style={{ padding: "10px 16px", textAlign: "center" }}>
                  <Center>{user.points}</Center>
                </td>
                <td style={{ padding: "10px 16px", textAlign: "center" }}>
                  <Button
                    variant="light"
                    onClick={() => handleAdjustPoints(user)}
                  >
                    Adjust Points
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {modalUser && (
        <AdjustPointsModal
          user={modalUser}
          onClose={() => setModalUser(null)} // Close the modal
          onSave={(updatedUser) => {
            setUsers((prev) =>
              prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            updateUserPoints(updatedUser.id, updatedUser.points);
            setModalUser(null); // Close the modal after saving
          }}
        />
      )}
    </div>
  );
}
