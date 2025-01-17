import { useAuth } from "../backend/authProvider";
import { Navigate, Outlet, NavLink, useLocation } from "react-router-dom";
import { AppShell, Group, Badge, rem, Tooltip, Image } from "@mantine/core";
import {
  IconShoppingCart,
  IconBuildingStore,
  IconUser,
  IconGavel,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUser } from "../backend/database";
import { User } from "../types";
import { useState, useEffect } from "react";
import { getImageUrl } from "../backend/storage";

import { useMantineTheme } from "@mantine/core";

export default function UserLayout() {
  const theme = useMantineTheme();
  const blue = theme.colors.blue[6];
  const { session, loading, isAdmin } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation(); // Get the current location

  // Fetch user data on component load
  useEffect(() => {
    const fetchData = async () => {
      const [fetchedUser] = await getUser();
      setUser(fetchedUser);
    };

    fetchData();
  }, []);

  const cart: any = useSelector((state: RootState) => state.cart);
  const cartItemCount = cart.items.reduce(
    (total: number, item: any) => total + (item.quantity || 1),
    0
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session || isAdmin) {
    // Redirect anon users or admins trying to access user routes
    return <Navigate to={isAdmin ? "/admin" : "/login"} replace />;
  }

  // Function to determine if the current path matches the given route
  const isActive = (path: string) => location.pathname === path;
  console.log(location.pathname);
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Image
            src={getImageUrl("Logo.png")}
            alt="Logo"
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: 60,
              width: "auto",
            }}
          />
          {/* Navigation */}
          <Group gap={rem(32)}>
            <Tooltip label="Mart">
              <NavLink
                to="/"
                style={{
                  transition: "transform 0.2s ease, filter 0.2s ease",
                  transform: isActive("/") ? "scale(1.2)" : "scale(1)",
                  filter: isActive("/")
                    ? "drop-shadow(0 0 8px rgba(0, 123, 255, 0.6))"
                    : "none",
                }}
              >
                <IconBuildingStore color={blue} />
              </NavLink>
            </Tooltip>

            <Tooltip label="Auction">
              <NavLink
                to="/auction"
                style={{
                  transition: "transform 0.2s ease, filter 0.2s ease",
                  transform: isActive("/auction") ? "scale(1.2)" : "scale(1)",
                  filter: isActive("/auction")
                    ? "drop-shadow(0 0 8px rgba(0, 123, 255, 0.6))"
                    : "none",
                }}
              >
                <IconGavel color={blue} />
              </NavLink>
            </Tooltip>

            <Tooltip label="Cart">
              <NavLink
                to="/cart"
                style={{
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, filter 0.2s ease",
                  transform: isActive("/cart") ? "scale(1.2)" : "scale(1)",
                  filter: isActive("/cart")
                    ? "drop-shadow(0 0 8px rgba(0, 123, 255, 0.6))"
                    : "none",
                }}
              >
                <IconShoppingCart size={24} color={blue} />
                {cartItemCount > 0 && (
                  <Badge
                    size="xs"
                    color="red"
                    variant="filled"
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-10px",
                      borderRadius: "50%",
                      height: "20px",
                      minWidth: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </NavLink>
            </Tooltip>

            <Tooltip label="Account">
              <NavLink
                to="/account"
                style={{
                  transition: "transform 0.2s ease, filter 0.2s ease",
                  transform: isActive("/account") ? "scale(1.2)" : "scale(1)",
                  filter: isActive("/account")
                    ? "drop-shadow(0 0 8px rgba(0, 123, 255, 0.6))"
                    : "none",
                }}
              >
                <IconUser color={blue} />
              </NavLink>
            </Tooltip>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
