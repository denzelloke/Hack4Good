import React from 'react';
import { Button, Box } from '@mantine/core';

interface RequestProductButtonProps {
  label: string;
  onClick: () => void;
}

const RequestProductButton: React.FC<RequestProductButtonProps> = ({ label, onClick }) => {
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 10, // To make sure it is on top of other elements
      }}
    >
      <Button
        onClick={onClick}
        variant="gradient" // Gradient button style
        gradient={{ from: 'indigo', to: 'cyan' }} // Gradient color
        size="lg" // Larger size for impact
        radius="xl" // Rounded corners
        style={{
          padding: '12px 20px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
          transition: 'all 0.3s ease', // Smooth transition
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'; // Scale the button on hover
          e.currentTarget.style.boxShadow = '0px 8px 24px rgba(0, 0, 0, 0.3)'; // Increased shadow on hover
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)'; // Reset scaling on mouse out
          e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.2)'; // Reset shadow
        }}
      >
        {label}
      </Button>
    </Box>
  );
};

export default RequestProductButton;
