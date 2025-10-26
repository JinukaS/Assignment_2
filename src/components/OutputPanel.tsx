"use client";

import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import Editor from "@monaco-editor/react"; // Use Monaco for nice code highlighting

interface OutputPanelProps {
    generatedCode: string;
}

export default function OutputPanel({ generatedCode }: OutputPanelProps) {
    const { resolvedTheme } = useTheme();
    const [isCopied, setIsCopied] = useState(false);

    // Function to copy code to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode).then(() => {
            setIsCopied(true);
            // Reset the button text after 2 seconds
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    // When the generated code changes, reset the "Copied" status
    useEffect(() => {
        setIsCopied(false);
    }, [generatedCode]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--border-color)' }}>
            {/* Toolbar */}
            <div style={{
                padding: '8px 16px',
                backgroundColor: 'var(--toolbar-background)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <span style={{ fontWeight: '500' }}>Generated Code Output</span>
                <button onClick={handleCopy} disabled={!generatedCode}>
                    {isCopied ? 'Copied!' : 'Copy Code'}
                </button>
            </div>

            {/* Code Display Area using Monaco Editor */}
            <Editor
                height="100%"
                language="html"
                value={generatedCode}
                theme={resolvedTheme === 'dark' ? 'vs-dark' : 'vs-light'}
                options={{
                    readOnly: true, // Make the editor read-only
                    domReadOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                }}
            />
        </div>
    );
}