import { useAuth } from "../backend/authProvider";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import {
  AppShell,
  Group,
  Badge,
  rem,
  Tooltip,
  Image,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconBuildingStore,
  IconUser,
  IconGavel
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUser } from '../backend/database';
import { User } from '../types';
import { useState, useEffect } from 'react';

export default function UserLayout() {
  const { session, loading, isAdmin } = useAuth();
  const [user, setUser] = useState<User | null>(null);

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
          
            <Badge 
            variant="outline" 
            radius="sm" 
            color="#390961" 
            size="lg"
            style={{
              position: 'relative',
              bottom: '3px',
              left: '5px',
              outline: '2px solid #6b26a3',
            }}
            >
              Points: {user ? user.points : 'Loading...'}
            </Badge>
           

            <Tooltip label="Mart">
              <NavLink to="/">
                <IconBuildingStore />
              </NavLink>
            </Tooltip>

            <Tooltip label="Auction">
              <NavLink to="/auction">
                <IconGavel />
              </NavLink>
            </Tooltip>

            <Tooltip label="Cart">
              <NavLink to="/cart" style={{ position: "relative", cursor: "pointer" }} color="blue">
                <IconShoppingCart size={24}  />
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
