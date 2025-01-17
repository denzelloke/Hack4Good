import { Button } from '@mantine/core';
import { useAuth } from '../../../backend/authProvider';
import { NavLink } from 'react-router-dom';

export function LogoutButton() {
  const { logout } = useAuth();
  return (
    <Button  
      radius="md"
      component={NavLink}
      to="/login"
      onClick={logout}
      color="blue"
      variant="filled"
      size="regular-md"
      style={{
        position: 'relative',
        top: '30px',
      }}
    >
      LOGOUT
    </Button>
  );
}

