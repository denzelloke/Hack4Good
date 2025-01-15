import { useAuth } from "../db/auth";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import {
  AppShell,
  Group,
  Text,
  UnstyledButton,
  Stack,
  rem,
  Badge, 
  Box,
  Loader
} from '@mantine/core';
import { IconHeart, IconShoppingCart, IconUser, Icon } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from "../store";


interface NavLinkData {
  icon: Icon;
  label: string;
  path: string;
}

const navLinks: NavLinkData[] = [
  { icon: IconHeart, label: "Auction", path: "/auction" },
  { icon: IconShoppingCart, label: "Cart", path: "/cart" },
  { icon: IconUser, label: "Account", path: "/account" },
];

export default function UserLayout() {

  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <Loader size="lg" />;
  }

  if (!session || isAdmin) {
    // Redirect anon users or admins trying to access user routes
    return <Navigate to={isAdmin ? "/admin" : "/login"} replace />;
  }

  const cart = useSelector((state: RootState) => state.cart);
  const cartItemCount = cart.items.reduce(
    (total: number, item: any) => total + (item.quantity || 1),
    0
  );

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Text size="xl" fw={700} style={{ cursor: 'pointer' }}>
            HOME!!!
          </Text>
        </NavLink>


          {/* Navigation */}
          <Group gap={rem(32)}>
            {navLinks.map(({ icon: Icon, label, path }) => (
              <NavLink key={path} to={path} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <UnstyledButton>
                    <Stack align="center" gap={rem(4)}>
                      <Icon
                        size={24}
                        style={{
                          color: isActive
                            ? "var(--mantine-color-blue-filled)"
                            : "var(--mantine-color-gray-6)",
                        }}
                      />
                      <Text size="sm" c={isActive ? "blue" : "dimmed"}>
                        {label}
                      </Text>
                    </Stack>
                  </UnstyledButton>
                )}
              </NavLink>
            ))}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

     {/* Cart Icon with Item Count */}
     <Box
       component="div"
       style={{
       position: 'absolute',
       bottom: '20px',
       right: '20px',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
     }}
  >

        <NavLink to="/cart">
          <UnstyledButton>
            <Stack align="center">
              <IconShoppingCart size={24} />
              {cartItemCount > 0 && (
                <Badge color="teal" size="sm">
                  {cartItemCount}
                </Badge>
              )}
            </Stack>
          </UnstyledButton>
        </NavLink>
      </Box>
    </AppShell>
  );
}
