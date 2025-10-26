"use client";

// Define the shape of a single tab object
export interface Tab {
    id: number;
    title: string;
    content: string;
}

interface TabsConfiguratorProps {
    tabs: Tab[];
    onTabsChange: (newTabs: Tab[]) => void;
}

export default function TabsConfigurator({ tabs, onTabsChange }: TabsConfiguratorProps) {

    // Function to add a new, empty tab
    const handleAddTab = () => {
        const newTab: Tab = {
            id: Date.now(), // Use a timestamp for a unique ID
            title: `Tab ${tabs.length + 1}`,
            content: `Content for tab ${tabs.length + 1}`,
        };
        onTabsChange([...tabs, newTab]);
    };

    // Function to remove a tab by its ID
    const handleRemoveTab = (id: number) => {
        onTabsChange(tabs.filter(tab => tab.id !== id));
    };

    // Function to update a specific tab's title or content
    const handleTabUpdate = (id: number, field: 'title' | 'content', value: string) => {
        const updatedTabs = tabs.map(tab =>
            tab.id === id ? { ...tab, [field]: value } : tab
        );
        onTabsChange(updatedTabs);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--background)'
        }}>
            {/* Toolbar */}
            <div style={{
                padding: '8px 16px',
                backgroundColor: 'var(--toolbar-background)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <span style={{ fontWeight: '500' }}>Tabs Configuration</span>
                <button onClick={handleAddTab} style={{ padding: '4px 8px' }}>
                    + Add Tab
                </button>
            </div>

            {/* Inputs Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {tabs.map((tab, index) => (
                    <div key={tab.id} style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        padding: '12px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ fontWeight: 'bold' }}>Tab {index + 1}</label>
                            <button onClick={() => handleRemoveTab(tab.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                                Remove
                            </button>
                        </div>
                        <input
                            type="text"
                            value={tab.title}
                            onChange={(e) => handleTabUpdate(tab.id, 'title', e.target.value)}
                            placeholder="Tab Title"
                            style={{ width: '100%', padding: '8px', marginTop: '8px', boxSizing: 'border-box' }}
                        />
                        <textarea
                            value={tab.content}
                            onChange={(e) => handleTabUpdate(tab.id, 'content', e.target.value)}
                            placeholder="Tab Content"
                            rows={4}
                            style={{ width: '100%', padding: '8px', marginTop: '8px', boxSizing: 'border-box', resize: 'vertical' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}