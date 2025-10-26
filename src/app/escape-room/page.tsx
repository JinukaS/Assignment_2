"use client";

import { useState } from 'react';
import Timer from '@/components/Timer';
import Stage1_FormatCode from '@/components/Stage1_FormatCode';
import Stage2_GenerateNumbers from '@/components/Stage2_GenerateNumbers';

export default function EscapeRoomPage() {
    const [stage, setStage] = useState(0); // 0: Start, 1: Stage 1, 2: Stage 2
    const [gameStatus, setGameStatus] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');

    // Starts the game and the timer, and moves to stage 1
    const handleStartGame = () => {
        setStage(1);
        setGameStatus('playing');
    };

    // Moves the game to the next stage
    const advanceToNextStage = () => {
        setStage(prev => prev + 1);
    };

    // Ends the game when the timer runs out
    const handleTimeUp = () => {
        setGameStatus('lost');
    };

    // Resets the game to the initial state
    const handleRestart = () => {
        setStage(0);
        setGameStatus('ready');
    };

    // This function determines which component to show based on the game's state
    const renderGameContent = () => {
        switch (gameStatus) {
            case 'won':
                return (
                    <div>
                        <h2 style={{color: '#0f0'}}>Congratulations! You&#39;ve Escaped!</h2>
                        <p>You successfully completed all the challenges.</p>
                        <button onClick={handleRestart} style={{padding: '10px 20px', marginTop: '1rem'}}>Play Again</button>
                    </div>
                );
            case 'lost':
                return (
                    <div>
                        <h2 style={{color: 'red'}}>Game Over</h2>
                        <p>The timer ran out. Better luck next time.</p>
                        <button onClick={handleRestart} style={{padding: '10px 20px', marginTop: '1rem'}}>Try Again</button>
                    </div>
                );
            case 'playing':
                switch (stage) {
                    case 1:
                        return <Stage1_FormatCode onComplete={advanceToNextStage} />;
                    case 2:
                        // The final stage calls setGameStatus('won') on completion
                        return <Stage2_GenerateNumbers onComplete={() => setGameStatus('won')} />;
                    default:
                        return <p>An unknown error occurred. Please refresh.</p>;
                }
            case 'ready':
            default:
                return (
                    <div>
                        <h2>Welcome to the Escape Room</h2>
                        <p>You have 5 minutes to complete two coding challenges and escape. Good luck.</p>
                        <button onClick={handleStartGame} style={{padding: '10px 20px', fontSize: '1.2rem', marginTop: '1rem'}}>
                            Start Challenge
                        </button>
                    </div>
                );
        }
    };

    return (
        <main style={{
            backgroundImage: 'url(/escape-room-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '2rem',
        }}>

            {/* The timer is only shown when the game is actively being played */}
            {gameStatus === 'playing' && <Timer initialTime={300} onTimeUp={handleTimeUp} />}

            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                color: 'white',
                border: '2px solid #0f0',
                borderRadius: '8px',
                padding: '2rem',
                width: '80%',
                maxWidth: '900px',
                textAlign: 'center'
            }}>
                {renderGameContent()}
            </div>
        </main>
    );
}