import { Button } from '@mantine/core';
import { NavLink } from 'react-router-dom';

export function LogoutButton() {
  return (
    <Button  
      fullWidth mt="sm" 
      radius="md"
      component={NavLink}
      to="/login"
      color="blue"
      variant="filled"
      style={{
        position: 'relative',
        bottom: '1px',
      }}
    >
      LOGOUT
    </Button>
  );
}

