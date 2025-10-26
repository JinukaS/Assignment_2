"use client"; // This must be a client component to use hooks like usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to get the current URL path
import { ThemeSwitcher } from './ThemeSwitcher'; // Import the theme switcher

export default function Header() {
    // Get the current path to determine which link is active
    const pathname = usePathname();

    // Define styles for links to avoid repetition
    const linkStyle = {
        padding: '8px 12px',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: '6px',
        transition: 'background-color 0.2s ease-in-out',
    };

    const activeLinkStyle = {
        ...linkStyle,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // A subtle background for the active link
    };

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            borderBottom: '1px solid #eee'
        }}>
            <div>
                <span style={{ fontWeight: 'bold' }}>22231148</span> {/* Your Student Number */}
            </div>

            {/* Navigation element for accessibility */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link
                    href="/"
                    style={pathname === '/' ? activeLinkStyle : linkStyle}
                >
                    Home
                </Link>
                <Link
                    href="/about"
                    style={pathname === '/about' ? activeLinkStyle : linkStyle}
                >
                    About
                </Link>
                <Link
                    href="/escape-room"
                    style={pathname === '/escape-room' ? activeLinkStyle : linkStyle}
                >
                    Escape Room
                </Link>
                <Link
                    href="*"
                    style={pathname === '/Pre-lab' ? activeLinkStyle : linkStyle}
                >
                    Pre-lab Question
                </Link>
                <Link
                    href="/gallery"
                    style={pathname === '/gallery' ? activeLinkStyle : linkStyle}
                >
                    Gallery
                </Link>
                {/* Theme switcher is placed here */}
                <ThemeSwitcher />
            </nav>
        </header>
    );
}