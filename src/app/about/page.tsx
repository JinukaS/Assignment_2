import type { Metadata } from 'next';

// This adds a specific title and description to the About page for better SEO.
export const metadata: Metadata = {
    title: 'About This Project',
    description: 'Learn more about the HTML generator tool and how to use it.',
};

export default function AboutPage() {
    return (
        // Main container for the page content
        <main style={{
            maxWidth: '800px',
            margin: '40px auto', // Centers the content and adds space from top/bottom
            padding: '0 20px',    // Adds space on the sides
            fontFamily: 'sans-serif',
            lineHeight: '1.6',
        }}>

            {/* Page Title */}
            <h1 style={{
                fontSize: '2.5rem',
                borderBottom: '2px solid #eee',
                paddingBottom: '10px',
                marginBottom: '20px',
            }}>
                About This Project
            </h1>

            {/* Personal Details Section */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Creator Information</h2>
                <p style={{ fontSize: '1.1rem' }}>
                    <strong>Name:</strong> Jinuka Methjaya Samarasinghe 
                </p>
                <p style={{ fontSize: '1.1rem' }}>
                    <strong>Student Number:</strong> 22231148
                </p>
            </section>

            {/* Video Tutorial Section */}
            <section>
                <h2 style={{ fontSize: '1.8rem' }}>How to Use This Website</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                    This video provides a complete walkthrough of the application, demonstrating how to generate HTML code for different components like tabs, accordions, and more.
                </p>

                {/* Responsive Video Embed */}
                <figure style={{
                    position: 'relative',
                    paddingBottom: '56.25%', // Aspect ratio 16:9
                    height: '0',
                    overflow: 'hidden',
                    borderRadius: '8px', // Optional: adds rounded corners
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Optional: adds a subtle shadow
                    margin: 0,
                }}>
                    <iframe
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                        }}
                        src="https://www.youtube.com/embed/your_video_id_here" // <-- IMPORTANT: REPLACE THIS
                        title="How to use the HTML Generator"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </figure>
            </section>

        </main>
    );
}