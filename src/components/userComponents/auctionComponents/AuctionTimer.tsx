import { useState, useEffect } from 'react';
import {Text} from '@mantine/core';


interface AuctionTimerProps {
    auctionEndTime: string;
    onAuctionEnd: () => void;
}

const AuctionTimer: React.FC<AuctionTimerProps> = ({ auctionEndTime, onAuctionEnd }) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        const endTime = new Date(auctionEndTime).getTime();
        const interval = setInterval(() => {
            const now = Date.now();
            const remainingTime = Math.max(0, endTime - now);
            setTimeLeft(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(interval);
                onAuctionEnd();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [auctionEndTime, onAuctionEnd]);

    const formatTime = (milliseconds: number) => {
        const seconds = Math.floor(milliseconds / 1000);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <Text style={{ color: timeLeft > 0 ? 'blue' : 'red', fontSize: '1.25rem', fontWeight: 500 }} mt="md">
            {timeLeft > 0 ? `Time Remaining: ${formatTime(timeLeft)}` : 'Auction Ended'}
        </Text>
    );
};

export default AuctionTimer;

