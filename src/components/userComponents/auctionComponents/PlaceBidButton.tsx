// interface PlaceBidButtonProps {
//     isDisabled: boolean;
//     onClick: () => void;
// }
//
// function PlaceBidButton({ isDisabled, onClick }: PlaceBidButtonProps) {
//     return (
//         <Button
//             fullWidth
//             mt="lg"
//             size="md"
//             variant="gradient"
//             gradient={{ from: 'teal', to: 'blue', deg: 60 }}
//             disabled={isDisabled}
//             onClick={onClick}
//         >
//             Place Bid
//         </Button>
//     );
// }
//
// export default PlaceBidButton;

import { useState } from 'react';
import { Button, Modal, TextInput, Group, Text } from '@mantine/core';

interface PlaceBidButtonProps {
    isDisabled: boolean;
    onClick: () => void;
    currentBid: number; // The current highest bid
    minimumIncrement: number; // Minimum increment required
    onPlaceBid: (bid: number) => void; // Callback when a valid bid is placed
}

function PlaceBidButton({ currentBid, minimumIncrement, onPlaceBid }: PlaceBidButtonProps) {
    const [opened, setOpened] = useState(false); // State for modal visibility
    const [bid, setBid] = useState<number | ''>(''); // State for user bid input
    const [error, setError] = useState<string>(''); // State for validation errors

    const handleBidSubmit = () => {
        if (typeof bid !== 'number' || bid <= currentBid) {
            setError(`Your bid must be higher than the current bid (${currentBid} credits).`);
            return;
        }

        if (bid - currentBid < minimumIncrement) {
            setError(`Your bid must be at least ${minimumIncrement} credits higher than the current bid.`);
            return;
        }

        setError(''); // Clear errors
        onPlaceBid(bid); // Call the parent callback with the valid bid
        setOpened(false); // Close the modal
        setBid(''); // Reset the input field
    };

    return (
        <>
            {/* Main Button */}
            <Button
                fullWidth
                mt="lg"
                size="md"
                variant="gradient"
                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                onClick={() => setOpened(true)}
            >
                Place Bid
            </Button>

            {/* Modal Popup */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Place Your Bid"
                size="sm"
            >
                <Text>Current Bid: {currentBid} credits</Text>
                <Text>Minimum Increment: {minimumIncrement} credits</Text>
                <TextInput
                    label="Your Bid"
                    placeholder={`Enter a bid higher than ${currentBid}`}
                    type="number"
                    value={bid}
                    onChange={(event) => setBid(Number(event.target.value))}
                    mt="md"
                />
                {error && (
                    <Text color="red" mt="sm">
                        {error}
                    </Text>
                )}
                <Group style={{ justifyContent: 'space-between', marginTop: '16px' }}>
                    <Button variant="default" onClick={() => setOpened(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleBidSubmit}>Submit Bid</Button>
                </Group>
            </Modal>
        </>
    );
}

export default PlaceBidButton;
