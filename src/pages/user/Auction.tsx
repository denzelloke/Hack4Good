import { useState, useEffect } from 'react';
import { Container, Text } from '@mantine/core';

import { AuctionItem, AuctionBid, User } from '../../types';
import { getAuctionItem, getBids, getAllUsers, createBid, getUserId } from "../../backend/database";

import AuctionCard from '../../components/userComponents/auctionComponents/AuctionCard';
import Leaderboard from '../../components/userComponents/auctionComponents/Leaderboard';

export default function AuctionPage() {
  const minimumIncrement = 10; 
  const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null);
  const [bids, setBids] = useState<AuctionBid[]>([]); // Updated type to array
  const [users, setUsers] = useState<User[]>([]); // Add users state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedAuctionItem] = await getAuctionItem();

        const fetchedBids = (await getBids()).filter(bid => bid.product_id === fetchedAuctionItem.id);
        setBids(fetchedBids);
        setAuctionItem({...fetchedAuctionItem, currentBid: fetchedBids[0].points, auctionEndTime: new Date(Date.now() + 3600 * 1000).toISOString() });
        
        const fetchedUsers = await getAllUsers(); // Fetch all users
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching auction data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePlaceBid = async (bid : number) => {
    if (!auctionItem || !auctionItem.id){
      throw new Error("Cannot placed bid yet.");
    }
    const user_id = await getUserId();
    setBids([{
      points: bid,
      user_id,
      product_id: '1',
      created_at: Date.now(),
      id: '1'
    },...bids])
    createBid(bid, Number(auctionItem.id));
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
      <Leaderboard bids={bids} users={users} />
    </Container>
  );
}
