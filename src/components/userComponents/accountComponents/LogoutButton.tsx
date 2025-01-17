import { Button } from '@mantine/core';
import { NavLink } from 'react-router-dom';

export function LogoutButton() {
  return (
    <Button  
      radius="md"
      component={NavLink}
      to="/login"
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

