import { useAuth } from "../backend/authProvider";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import {
  AppShell,
  Group,
  Image,
  Stack,
  Divider,
  Button,
  Text,
  Loader,
} from "@mantine/core";
import {
  IconDashboard,
  IconBox,
  IconUsers,
  IconFileText,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getUser } from "../backend/database";
import { User } from "../types";

export default function AdminLayout() {
  const { session, loading, isAdmin, logout } = useAuth();
  const [admin, setAdmin] = useState<User | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [fetchedAdmin] = await getUser();
        if (fetchedAdmin) {
          setAdmin(fetchedAdmin);
        } else {
          console.error("Admin data is missing");
        }
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Loader />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to={session ? "/" : "/login"} replace />;
  }

  const handleLogout = () => {
    logout();
  };

  if (location.pathname === "/admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }  

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      navbar={{
        width: 250,
        padding: "16px",
        height: "100vh",
        position: "fixed",
      }}
      styles={{
        navbar: {
          background: "linear-gradient(135deg, rgb(221, 238, 251),rgb(168, 213, 248))",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <AppShell.Navbar>
        <Stack align="center" mt="md">
          <Text fw={600} size="xl">
            {admin?.username || "Admin"}
          </Text>
          <Text size="sm" fw={500}>
            {new Date().toLocaleString("en-UK", {
              weekday: "long",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
          <Divider />

          {/* Navigation */}
          <NavLink to="/admin/dashboard" style={({ isActive }) => ({
            backgroundColor: isActive ? "#e1bee7" : "transparent", 
            padding: "8px", 
            borderRadius: "4px",
          })}>
            <Group>
              <IconDashboard size={24} />
              <Text size="md" fw={500}>
                Dashboard
              </Text>
            </Group>
          </NavLink>

          <NavLink to="/admin/inventory" style={({ isActive }) => ({
            backgroundColor: isActive ? "#e1bee7" : "transparent", 
            padding: "8px", 
            borderRadius: "4px",
          })}>
            <Group>
              <IconBox size={24} />
              <Text size="md" fw={500}>
                Inventory
              </Text>
            </Group>
          </NavLink>

          <NavLink to="/admin/people" style={({ isActive }) => ({
            backgroundColor: isActive ? "#e1bee7" : "transparent", 
            padding: "8px", 
            borderRadius: "4px",
          })}>
            <Group>
              <IconUsers size={24} />
              <Text size="md" fw={500}>
                People
              </Text>
            </Group>
          </NavLink>

          <NavLink to="/admin/transactions" style={({ isActive }) => ({
            backgroundColor: isActive ? "#e1bee7" : "transparent", 
            padding: "8px", 
            borderRadius: "4px",
          })}>
            <Group>
              <IconFileText size={24} />
              <Text size="md" fw={500}>
                Transactions
              </Text>
            </Group>
          </NavLink>
        </Stack>

        <Divider />

        {/* Logout Button */}
        <Button
          variant="light"
          color="red"
          size="md"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </AppShell.Navbar>

      {/* Header */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Image
            src="/assets/Logo.png"
            alt="Logo"
            width={110}
            height={60}
            style={{ cursor: "pointer" }}
          />
          <Text fw={500} size="lg">
            Admin Panel
          </Text>
        </Group>
      </AppShell.Header>

      {/* Main Content */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
