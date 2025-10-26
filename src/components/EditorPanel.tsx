"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes"; // <-- IMPORT useTheme

export default function EditorPanel() {
    const { resolvedTheme } = useTheme(); // <-- GET THE CURRENT THEME

    const defaultCode = `// Your default Java code here
class Main {
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
    }
}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--border-color)' }}>
            {/* Top Toolbar */}
            <div style={{
                padding: '8px 16px',
                backgroundColor: 'var(--toolbar-background)', // <-- USE VARIABLE
                borderBottom: '1px solid var(--border-color)', // <-- USE VARIABLE
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <span style={{ fontWeight: '500' }}>Main.java</span>
                {/* Buttons can also use CSS variables if you add more styling */}
            </div>

            {/* Monaco Code Editor */}
            <div style={{ flex: 1, height: '100%' }}>
                <Editor
                    height="100%"
                    defaultLanguage="java"
                    defaultValue={defaultCode}
                    // Dynamically set the theme based on the resolved theme
                    theme={resolvedTheme === 'dark' ? 'vs-dark' : 'vs-light'} // <-- DYNAMIC THEME
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: "on",
                    }}
                />
            </div>
        </div>
    );
}