import { useAuth } from "../backend/authProvider";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import {
  AppShell,
  Group,
  Text,
  Badge,
  rem,
  Tooltip,
  Image
} from "@mantine/core";
import {
  IconShoppingCart,
  IconBuildingStore,
  IconUser
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function UserLayout() {
  const { session, loading, isAdmin } = useAuth();

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

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Image 
              src="/assets/Logo.png"  
              alt="Logo" 
              width={110}  // Adjust the width as needed
              height={60}  // Adjust the height as needed
              style={{ cursor: 'pointer' }}
            />

          {/* Navigation */}
          <Group gap={rem(32)}>
            <Tooltip label="Mart">
              <NavLink to="/">
                <IconBuildingStore />
              </NavLink>
            </Tooltip>

            <Tooltip label="Cart">
              <NavLink to="/cart" style={{ position: "relative", cursor: "pointer" }}>
                <IconShoppingCart size={24} />
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
              <NavLink to="/account">
                <IconUser />
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
