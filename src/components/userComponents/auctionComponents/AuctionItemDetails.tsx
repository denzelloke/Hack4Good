import {Text, Title, Group, Badge } from '@mantine/core';

interface AuctionItemDetailsProps {
    name: string;
    description: string;
    currentBid: number;
}

function AuctionItemDetails({ name, description, currentBid }: AuctionItemDetailsProps) {
    return (
        <>
            <Group style={{ justifyContent: 'space-between', marginTop: '16px', marginBottom: '8px' }}>
                <Title order={2}>{name}</Title>
                <Badge style={{ backgroundColor: 'green', fontSize: '1rem' }}>
                    Current Bid: {currentBid} points
                </Badge>
            </Group>
            <Text size="sm" color="dimmed">
                {description}
            </Text>
        </>
    );
}

export default AuctionItemDetails;
