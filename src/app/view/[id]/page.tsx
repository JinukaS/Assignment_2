import type { Metadata } from 'next';
import { getOutputById } from '@/services/api/outputService';

// ✅ FIXED: Define params as Promise<{ id: string }>
export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params; // Await params before use
    return {
        title: `Viewing Saved Output: ${id}`,
    };
}

export default async function ViewPage(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; // Await params before use

    try {
        const savedOutput = await getOutputById(id);

        if (!savedOutput) {
            return (
                <main style={{ textAlign: 'center', margin: '50px auto', padding: '0 20px' }}>
                    <h1 style={{ fontSize: '2.5rem' }}>Output Not Found</h1>
                    <p>
                        The saved output with ID <code>{id}</code> could not be found.
                    </p>
                </main>
            );
        }

        // ✅ Render using iframe
        return (
            <iframe
                srcDoc={savedOutput.htmlContent}
                title={`Saved Output ${id}`}
                style={{
                    width: '100%',
                    height: 'calc(100vh - 80px)',
                    border: 'none',
                }}
            />
        );

    } catch (error) {
        console.error("Error rendering view page:", error);
        return (
            <main style={{ textAlign: 'center', margin: '50px auto', color: 'red' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Server Error</h1>
                <p>Could not load the output due to a server error.</p>
            </main>
        );
    }
}
