import { NavLink, Outlet } from 'react-router-dom';
import { 
  AppShell,
  Group,
  Text,
  UnstyledButton,
  Stack,
  rem
} from '@mantine/core';
import { IconHeart, IconShoppingCart, IconUser, Icon } from '@tabler/icons-react';

interface NavLinkData {
  icon: Icon;
  label: string;
  path: string;
}

const navLinks: NavLinkData[] = [
  { icon: IconHeart, label: 'Auction', path: '/auction' },
  { icon: IconShoppingCart, label: 'Checkout', path: '/checkout' },
  { icon: IconUser, label: 'Account', path: '/account' },
];

export default function UserLayout() {
  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text size="xl" fw={700}>
            LOGO123
          </Text>

          {/* Navigation */}
          <Group gap={rem(32)}>
            {navLinks.map(({ icon: Icon, label, path }) => (
              <NavLink
                key={path}
                to={path}
                style={{ textDecoration: 'none' }}
              >
                {({ isActive }) => (
                  <UnstyledButton>
                    <Stack align="center" gap={rem(4)}>
                      <Icon 
                        size={24}
                        style={{ 
                          color: isActive ? 'var(--mantine-color-blue-filled)' : 'var(--mantine-color-gray-6)'
                        }}
                      />
                      <Text 
                        size="sm"
                        c={isActive ? 'blue' : 'dimmed'}
                      >
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
    </AppShell>
  );
}