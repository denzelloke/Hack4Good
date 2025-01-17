import AuctionTimer from "./AuctionTimer.tsx";
import AuctionItemDetails from "./AuctionItemDetails.tsx";
import PlaceBidButton from "./PlaceBidButton.tsx"
import {Card, Image } from '@mantine/core';

export interface AuctionItem {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    currentBid: number;
    auctionEndTime: string;
}

interface AuctionCardProps {
    auctionItem: AuctionItem;
    timeLeft: number;
    onBidClick: () => void;
}

function AuctionCard({ auctionItem, timeLeft, onBidClick }: AuctionCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image src={auctionItem.imageUrl} alt={auctionItem.name} height={250} />
            </Card.Section>
            <AuctionItemDetails
                name={auctionItem.name}
                description={auctionItem.description}
                currentBid={auctionItem.currentBid}
            />
            <AuctionTimer
                auctionEndTime={auctionItem.auctionEndTime}
                onAuctionEnd={() => console.log('Auction Ended')}
            />
            <PlaceBidButton isDisabled={timeLeft <= 0} onClick={onBidClick} />
        </Card>
    );
}

export default AuctionCard;
