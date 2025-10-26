"use client";

import { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface MainLayoutProps {
    editor: ReactNode;
    output: ReactNode;
}

export default function MainLayout({ editor, output }: MainLayoutProps) {
    return (
        <PanelGroup direction="horizontal">
            <Panel defaultSize={60} minSize={20}>
                {editor}
            </Panel>
            <PanelResizeHandle style={{ width: '10px', background: '#e1e1e1' }} />
            <Panel defaultSize={40} minSize={20}>
                {output}
            </Panel>
        </PanelGroup>
    );
}
