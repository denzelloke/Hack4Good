import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mantine/core';
import { getImageUrl } from '../../../backend/storage';
import { Product } from '../../../types';

interface BannerProps {
  product: Product;
}

const AuctionBanner: React.FC<BannerProps> = ({ product }) => {
  const [bannerUrl, setBannerUrl] = useState<string>('');

  // Fetch the image URL when the component mounts
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await getImageUrl('AuctionBanner.jpg');
        setBannerUrl(imageUrl); // Set the URL in the state
      } catch (error) {
        console.error('Failed to fetch banner image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* Banner image with "Auction is going on!" text */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '400px', // Adjust height as needed
          backgroundImage: `url(${bannerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        {/* Auction text on top of the image */}
        <div
          style={{
            position: 'absolute',
            top: '10px', // Reduced gap from top
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'black', // Text color black
            fontSize: '30px', // Smaller font size
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '5px', // Reduced margin to decrease space
          }}
        >
          Auction is going on!
        </div>

        {/* Image box and product name */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '60px', // Reduced padding to decrease the gap
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Translucent black background for the box
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              maxWidth: '250px',
              textAlign: 'center',
            }}
          >
            <img
              src={getImageUrl(product.url)} // Assuming product has imageUrl property
              alt={product.name}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <h1
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                marginTop: '15px',
                textTransform: 'uppercase',
                color: 'white', // White color for the name
              }}
            >
              {product.name}
            </h1>
          </div>
        </div>

        {/* Bid Now button outside the banner */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <NavLink to="/auction" style={{ textDecoration: 'none' }}>
          <Button
            style={{
              backgroundColor: '#ff6f61',
              color: 'white',
              fontSize: '16px',
              padding: '12px 30px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e05b4c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6f61';
            }}
          >
            Bid Now
          </Button>
        </NavLink>
      </div>
      </div>

    </div>
  );
};

export default AuctionBanner;
