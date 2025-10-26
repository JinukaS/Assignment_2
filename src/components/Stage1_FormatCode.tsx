"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface Stage1Props {
    onComplete: () => void;
}

const brokenJavaCode = `class Main {
    public static void main(String[] args) {
        int n = 5;
        int sum = 0;
        // The loop should include the number 5 in the sum.
        for (int i = 1; i < n; i++) {
            sum += i;
        }
        System.out.println("The sum is: " + sum);
    }
}`;

const correctSum = 15;

export default function Stage1_DebugCode({ onComplete }: Stage1Props) {
    const [userCode, setUserCode] = useState(brokenJavaCode);
    const [output, setOutput] = useState('// Click "Run" to compile and see the output here...');
    // --- STEP 1: ADD NEW STATE ---
    // This state will control whether the "Run" button is clickable.
    const [debuggerEnabled, setDebuggerEnabled] = useState(false);

    const handleRunCode = () => {
        // This function will only be callable if debuggerEnabled is true.
        // The logic inside remains the same as the previous corrected version.
        const codeWithoutComments = userCode.replace(/\/\/.*$/gm, '');
        // ... (rest of the robust compiler logic)

        let sumResult = 0;
        try {
            const nMatch = codeWithoutComments.match(/int\s+n\s*=\s*(\d+)\s*;/);
            const nValue = nMatch ? parseInt(nMatch[1]) : 0;
            const loopMatch = codeWithoutComments.match(/for\s*\((.*);\s*(.*);\s*(.*)\)/);
            if (!loopMatch) throw new Error("Could not parse the for loop.");
            const loopCondition = loopMatch[2];
            let tempSum = 0;
            if (loopCondition.includes("<=")) {
                for (let i = 1; i <= nValue; i++) tempSum += i;
            } else if (loopCondition.includes("<")) {
                for (let i = 1; i < nValue; i++) tempSum += i;
            }
            sumResult = tempSum;
            setOutput(`The sum is: ${sumResult}`);
            if (sumResult === correctSum) {
                setTimeout(() => onComplete(), 1500);
            }
        } catch (e) {
            setOutput('Execution Error: Could not understand the code structure.');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Stage 1: Debug the Program</h2>
                    <p>This program should sum integers from 1 to 5. Find the bug, activate the debugger, and run the corrected code.</p>
                </div>
                {/* --- STEP 2: ADD THE CLICKABLE IMAGE --- */}
                <div style={{ textAlign: 'center' }}>
                    <img
                        src="/debugger-icon.png" // Path to your image in the /public folder
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
                            language="java"
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
                                <span>Output</span>
                                {/* --- STEP 3: DISABLE THE BUTTON BASED ON STATE --- */}
                                <button
                                    onClick={handleRunCode}
                                    style={{
                                        padding: '2px 10px',
                                        cursor: debuggerEnabled ? 'pointer' : 'not-allowed',
                                        opacity: debuggerEnabled ? 1 : 0.5
                                    }}
                                    disabled={!debuggerEnabled}
                                >
                                    Run
                                </button>
                            </div>
                            <pre>{output}</pre>
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}