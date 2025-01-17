import { useAuth } from "../backend/authProvider";
import { useMantineTheme } from "@mantine/core";
import { Navigate, Outlet, NavLink, useLocation } from "react-router-dom";
import {
  AppShell,
  Group,
  Stack,
  Divider,
  Button,
  Text,
  Image,
  Loader,
  Box,
} from "@mantine/core";
import {
  IconDashboard,
  IconBox,
  IconUsers,
  IconFileText,
  IconLogout,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getUser } from "../backend/database";
import { User } from "../types";
import { getImageUrl } from "../backend/storage";

export default function AdminLayout() {
  const { session, loading, isAdmin, logout } = useAuth();
  const [admin, setAdmin] = useState<User | null>(null);

  const theme = useMantineTheme();
  const blue = theme.colors.blue[6];
  const location = useLocation(); // Get the current location

  const isActive = (path: string) => location.pathname === path;

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
      <Box className="flex justify-center items-center h-screen">
        <Loader />
      </Box>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to={session ? "/" : "/login"} replace />;
  }

  const navLinks = [
    { label: "Dashboard", to: "/admin", icon: <IconDashboard /> },
    { label: "Inventory", to: "/admin/inventory", icon: <IconBox /> },
    { label: "People", to: "/admin/people", icon: <IconUsers /> },
    {
      label: "Transactions",
      to: "/admin/transactions",
      icon: <IconFileText />,
    },
  ];

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 250,
        height: "100vh",
        position: "fixed",
      }}
    >
      <AppShell.Navbar>
        <Stack>
          <Box p="md">
            <Image
              src={getImageUrl("Logo.png")}
              alt="Logo"
              className="w-32 mb-2"
            />
          </Box>

          {/* User Section */}
          <Box p="md" bg="blue.0" className="rounded-lg">
            <Text size="lg" fw={600} className="text-blue-8">
              {admin?.username || "Admin"}
            </Text>
            <Text size="sm" c="dimmed">
              Administrator
            </Text>
          </Box>

          <Divider my="md" />

          {/* Navigation Links */}
          <Stack className="flex-grow">
            {navLinks.map((link) => (

            ))}
          </Stack>


          <Divider my="md" />

          {/* Logout Section */}
          <Button
            variant="subtle"
            color="red"
            fullWidth
            leftSection={<IconLogout size={20} />}
            onClick={logout}
            className="mb-4"
          >
            Logout
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
