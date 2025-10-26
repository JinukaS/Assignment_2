"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
// --- STEP 1: Import the new deleteOutput function ---
import { getAllOutputs, deleteOutput, type SavedOutput } from '@/services/api/outputService';

export default function GalleryPage() {
    const [outputs, setOutputs] = useState<SavedOutput[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // State to track which item is currently being deleted for UI feedback
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // --- Data fetching logic remains the same ---
    useEffect(() => {
        const fetchOutputs = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getAllOutputs();
                setOutputs(data);
            } catch (err) {
                // --- STEP 2: Use a more specific error message ---
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
                setError(`Failed to load saved outputs. ${errorMessage}`);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOutputs();
    }, []);

    // --- STEP 3: Create the handler for the delete action ---
    const handleDelete = async (id: string) => {
        // Confirm with the user before deleting
        if (!window.confirm("Are you sure you want to delete this output forever?")) {
            return;
        }

        setDeletingId(id); // Set loading state for the specific button
        setError(null);

        try {
            await deleteOutput(id);
            // On success, update the UI instantly by filtering out the deleted item
            setOutputs(currentOutputs => currentOutputs.filter(output => output.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to delete output. ${errorMessage}`);
            console.error(err);
        } finally {
            setDeletingId(null); // Reset loading state
        }
    };

    // --- Render logic ---
    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><p>Loading Gallery...</p></div>;
    }

    return (
        <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '10px', marginBottom: '30px' }}>
                Saved Outputs Gallery
            </h1>

            {/* Display a global error message if one occurs during deletion */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

            {outputs.length === 0 ? (
                <p>No saved outputs found. Go to the homepage to create and save one!</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                }}>
                    {outputs.map((output) => (
                        <div
                            key={output.id}
                            style={{
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                backgroundColor: 'var(--toolbar-background)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* The main content area is still a link */}
                            <Link href={`/view/${output.id}`} style={{ textDecoration: 'none', color: 'inherit', padding: '20px', flexGrow: 1 }}>
                                <h3 style={{ marginTop: 0 }}>Saved Output</h3>
                                <p style={{ wordBreak: 'break-all', fontSize: '0.9rem', opacity: 0.7 }}>
                                    <strong>ID:</strong> {output.id}
                                </p>
                                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                                    <strong>Created:</strong> {new Date(output.createdAt).toLocaleString()}
                                </p>
                            </Link>

                            {/* --- STEP 4: Add the delete button area --- */}
                            <div style={{ padding: '0 20px 20px', marginTop: 'auto' }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the Link from firing
                                        handleDelete(output.id);
                                    }}
                                    disabled={deletingId === output.id}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        cursor: 'pointer',
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px'
                                    }}
                                >
                                    {deletingId === output.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}