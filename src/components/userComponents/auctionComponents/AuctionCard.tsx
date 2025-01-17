import AuctionTimer from "./AuctionTimer.tsx";
import AuctionItemDetails from "./AuctionItemDetails.tsx";
import PlaceBidButton from "./PlaceBidButton.tsx";
import { Card, Image } from '@mantine/core';
import { getImageUrl } from "../../../backend/storage.ts";
import { AuctionItem } from "../../../types.ts";

interface AuctionCardProps {
    auctionItem: AuctionItem;
    timeLeft: number;
    onBidClick: (newBid: number) => void;
    minimumIncrement: number;
}

function AuctionCard({ auctionItem, timeLeft, onBidClick, minimumIncrement }: AuctionCardProps) {
    const handlePlaceBid = () => {
        const newBid = auctionItem.currentBid + minimumIncrement;
        onBidClick(newBid);
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image src={getImageUrl(auctionItem.url)} alt={auctionItem.name} height={250} />
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
            <PlaceBidButton
                isDisabled={timeLeft <= 0}
                onClick={handlePlaceBid}
                currentBid={auctionItem.currentBid}
                minimumIncrement={minimumIncrement}
                onPlaceBid={handlePlaceBid}
            />
        </Card>
    );
}

export default AuctionCard;
