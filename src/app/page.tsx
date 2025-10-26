"use client";

import { useState } from 'react';
import MainLayout from "@/components/MainLayout";
import TabsConfigurator, { type Tab } from '@/components/TabsConfigurator';
import OutputPanel from "@/components/OutputPanel";
// --- STEP 1: Import your new API service function ---
import { saveOutput } from '@/services/api/outputService';

// --- CORRECTED FUNCTION: Generates HTML without using CSS classes ---
function generateTabsHTML(tabs: Tab[]): string {
    if (tabs.length === 0) {
        return "<!-- Add and configure tabs to generate the HTML code here. -->";
    }

    // A unique ID for the main container to avoid conflicts
    const containerId = 'tabs-container-' + Date.now();

    const tabButtons = tabs.map((tab, index) =>
        `    <button 
      onclick="openTab(event, '${containerId}', ${index})"
      style="padding: 10px 15px; border: 1px solid #ccc; background-color: #f1f1f1; cursor: pointer; margin-right: 2px;"
    >
      ${tab.title}
    </button>`
    ).join('\n');

    const tabContents = tabs.map((tab, index) =>
        `    <div style="display: ${index === 0 ? 'block' : 'none'}; padding: 20px; border: 1px solid #ccc; border-top: none;">
      <p>${tab.content}</p>
    </div>`
    ).join('\n');

    return `<!DOCTYPE html>
<html>
<head>
<title>Generated Tabs</title>
</head>
<body>
  <h2>Dynamic Tabs</h2>
  <p>Click on the buttons to open the different tabs:</p>
  <div id="${containerId}" style="overflow: hidden;">
    <div style="display: flex;">
${tabButtons}
    </div>
${tabContents}
  </div>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    var container = document.getElementById('${containerId}');
    var firstButton = container.getElementsByTagName('button')[0];
    if (firstButton) firstButton.style.backgroundColor = '#ddd';
  });

  function openTab(evt, containerId, tabIndex) {
    var i, container, tabcontent, tabbuttons;
    container = document.getElementById(containerId);
    tabcontent = container.getElementsByTagName('div');
    for (i = 1; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tabbuttons = container.getElementsByTagName('button');
    for (i = 0; i < tabbuttons.length; i++) {
      tabbuttons[i].style.backgroundColor = "#f1f1f1";
    }
    tabcontent[tabIndex + 1].style.display = "block";
    evt.currentTarget.style.backgroundColor = "#ddd";
  }
</script>
</body>
</html>`;
}


export default function HomePage() {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: 1, title: 'Step 1', content: 'Install VSCode' }
    ]);
    const [generatedCode, setGeneratedCode] = useState('');

    // --- STEP 2: Add new state for UI feedback ---
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleGenerateCode = () => {
        const code = generateTabsHTML(tabs);
        setGeneratedCode(code);
        setSaveStatus('idle'); // Reset save status when new code is generated
    };

    // --- STEP 3: Create the handler function to save the code ---
    const handleSaveCode = async () => {
        if (!generatedCode) {
            alert("Please generate some code before saving!");
            return;
        }

        setIsSaving(true);
        setSaveStatus('idle');

        try {
            // Use the clean, centralized API function from your service file
            const savedData = await saveOutput(generatedCode);
            console.log('Saved successfully! ID:', savedData.id);
            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 3000); // Hide message after 3 seconds
        } catch (error) {
            console.error("Failed to save:", error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000); // Hide message after 3 seconds
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 120px)' }}>
            <div style={{
                textAlign: 'center',
                padding: '10px',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'var(--toolbar-background)',
                display: 'flex', // Use flexbox for alignment
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px' // Space between buttons
            }}>
                <button
                    onClick={handleGenerateCode}
                    style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                >
                    Generate HTML Code
                </button>

                {/* --- STEP 4: Add the new Save button and status messages --- */}
                <button
                    onClick={handleSaveCode}
                    disabled={isSaving || !generatedCode}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: (isSaving || !generatedCode) ? 'not-allowed' : 'pointer',
                        opacity: (isSaving || !generatedCode) ? 0.6 : 1
                    }}
                >
                    {isSaving ? 'Saving...' : 'Save to Cloud'}
                </button>

            </div>
            {/* Conditionally render status messages below the button bar */}
            {saveStatus === 'success' && <p style={{ color: 'green', textAlign: 'center' }}>Saved successfully!</p>}
            {saveStatus === 'error' && <p style={{ color: 'red', textAlign: 'center' }}>Failed to save. Please try again.</p>}

            <MainLayout
                editor={<TabsConfigurator tabs={tabs} onTabsChange={setTabs} />}
                output={<OutputPanel generatedCode={generatedCode} />}
            />
        </div>
    );
}