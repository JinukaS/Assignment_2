"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface Stage2Props {
    onComplete: () => void;
}

const initialJsCode = `// Write a JavaScript function or script that logs all numbers
// from 0 to 1000 (inclusive) to the console.

`;

export default function Stage2_GenerateNumbers({ onComplete }: Stage2Props) {
    const [userCode, setUserCode] = useState(initialJsCode);
    const [output, setOutput] = useState('// Find and activate the debugger to enable the "Run Script" button.');
    // ADD NEW STATE for the debugger
    const [debuggerEnabled, setDebuggerEnabled] = useState(false);

    const handleRunCode = () => {
        // Mock Executor Logic
        const code = userCode.toLowerCase();
        const hasLoop = code.includes('for') || code.includes('while');
        const hasLog = code.includes('console.log');
        const hasCorrectEnd = code.includes('1000') && (code.includes('<=') || code.includes('1001'));
        const hasCorrectStart = code.includes('0');

        if (hasLoop && hasLog && hasCorrectEnd && hasCorrectStart) {
            const successMessage = "Execution successful!\n[Output]:\n0\n1\n2\n...\n999\n1000\n\nChallenge complete. Access granted.";
            setOutput(successMessage);
            setTimeout(() => onComplete(), 2000);
        } else {
            const errorMessage = "Execution Failed: Script did not produce the correct output.\n\nHINT: Ensure your code uses a loop, logs to the console, and includes all numbers from 0 to 1000.";
            setOutput(errorMessage);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Stage 2: Code Execution Challenge</h2>
                    <p>The system requires a validation script. Activate the debugger and run the correct code to proceed.</p>
                </div>
                {/* ADD THE CLICKABLE IMAGE */}
                <div style={{ textAlign: 'center' }}>
                    <img
                        src="/debugger-icon.png" // Using the same image for consistency
                        alt="Activate Debugger"
                        title={debuggerEnabled ? "Debugger is Active" : "Click to Activate Debugger"}
                        style={{
                            width: '60px',
                            height: '60px',
                            cursor: 'pointer',
                            border: debuggerEnabled ? '2px solid #0f0' : '2px solid #555',
                            borderRadius: '50%',
                            padding: '5px',
                            transition: 'all 0.2s ease-in-out',
                        }}
                        onClick={() => setDebuggerEnabled(true)}
                    />
                    <p style={{ margin: 0, color: debuggerEnabled ? '#0f0' : '#888', fontSize: '0.8rem' }}>
                        {debuggerEnabled ? 'Debugger Online' : 'Debugger Offline'}
                    </p>
                </div>
            </div>

            <div style={{
                border: '1px solid #0f0',
                height: '400px',
                marginTop: '1rem',
                textAlign: 'left'
            }}>
                <PanelGroup direction="vertical">
                    <Panel defaultSize={70} minSize={20}>
                        <Editor
                            height="100%"
                            language="javascript"
                            theme="vs-dark"
                            value={userCode}
                            onChange={(value) => setUserCode(value || '')}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </Panel>
                    <PanelResizeHandle style={{ height: '10px', background: '#333' }} />
                    <Panel defaultSize={30} minSize={10}>
                        <div style={{
                            height: '100%',
                            backgroundColor: '#1e1e1e',
                            padding: '10px',
                            fontFamily: 'monospace',
                            color: '#ccc',
                            overflowY: 'auto'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '10px' }}>
                                <span>Terminal</span>
                                {/* DISABLE THE BUTTON BASED ON STATE */}
                                <button
                                    onClick={handleRunCode}
                                    style={{
                                        padding: '2px 10px',
                                        cursor: debuggerEnabled ? 'pointer' : 'not-allowed',
                                        opacity: debuggerEnabled ? 1 : 0.5
                                    }}
                                    disabled={!debuggerEnabled}
                                >
                                    Run Script
                                </button>
                            </div>
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{output}</pre>
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}