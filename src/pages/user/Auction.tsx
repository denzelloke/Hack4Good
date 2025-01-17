import { useState, useEffect } from 'react';
import { Container, Text} from '@mantine/core';
import AuctionCard, { AuctionItem } from "../../components/auctionComponents/AuctionCard.tsx";

// Mock data for the auction item
const mockAuctionItem: AuctionItem = {
    id: '1',
    name: 'Luxury Chair',
    description: 'A handcrafted luxury chair made from premium materials.',
    imageUrl: 'https://via.placeholder.com/400',
    currentBid: 150,
    auctionEndTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour from now
};

export default function AuctionPage() {
    const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null);

    useEffect(() => {
        // Simulate fetching data from the backend
        setAuctionItem(mockAuctionItem);
    }, []);

    const handlePlaceBid = () => {
        console.log('Place Bid clicked');
    };

    if (!auctionItem) {
        return <Text>Loading auction item...</Text>;
    }

    return (
        <Container size="md" py="xl">
            <AuctionCard auctionItem={auctionItem} timeLeft={3600} onBidClick={handlePlaceBid} />
        </Container>
    );
}

