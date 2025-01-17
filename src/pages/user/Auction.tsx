import { useState, useEffect } from 'react';
import { Container, Text } from '@mantine/core';

import { AuctionItem, AuctionBid, User } from '../../types';
import { getAuctionItem, getBids, getAllUsers } from "../../backend/database";

import AuctionCard from '../../components/userComponents/auctionComponents/AuctionCard';
import Leaderboard from '../../components/userComponents/auctionComponents/Leaderboard';

export default function AuctionPage() {
  const minimumIncrement = 10; // should be changeable by admin
  const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null);
  const [bids, setBids] = useState<AuctionBid[]>([]); // Updated type to array
  const [users, setUsers] = useState<User[]>([]); // Add users state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedAuctionItem] = await getAuctionItem();
        setAuctionItem(fetchedAuctionItem);

        const fetchedBids = await getBids();
        setBids(fetchedBids);

        const fetchedUsers = await getAllUsers(); // Fetch all users
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching auction data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePlaceBid = () => {
    console.log('Place Bid clicked');
    
  };

  if (!auctionItem) {
    return <Text>Loading auction item...</Text>;
  }

  return (
    <Container size="md" py="xl">
      <AuctionCard
        auctionItem={auctionItem}
        timeLeft={3600}
        onBidClick={handlePlaceBid}
        minimumIncrement={minimumIncrement}
      />
      <Leaderboard bids={bids.filter(bid => bid.product_id === auctionItem.product_id)} users={users} />
    </Container>
  );
}
