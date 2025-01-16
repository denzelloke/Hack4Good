import { Button } from '@mantine/core';
import { NavLink } from 'react-router-dom';

export function LogoutButton() {
  return (
    <Button
      component={NavLink}
      to="/login"
      color="blue"
      variant="filled"
      style={{
        position: 'relative',
        top: '50px',
      }}
    >
      LOGOUT
    </Button>
  );
}
