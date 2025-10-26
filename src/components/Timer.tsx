"use client";

import { useState, useEffect } from 'react';

interface TimerProps {
    initialTime: number; // Time in seconds
    onTimeUp: () => void;
}

export default function Timer({ initialTime, onTimeUp }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        // If time is up, do nothing.
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        // Set up the interval
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeUp]);

    // Format the time to MM:SS
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div style={{
            fontSize: '2rem',
            color: '#0f0', // Hacker green text
            fontFamily: 'monospace',
            marginBottom: '1rem',
            padding: '10px',
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: '1px solid #0f0',
            borderRadius: '5px'
        }}>
            Time Left: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    );
}