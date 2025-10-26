"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// CORRECT IMPORT: Import directly from "next-themes"
import { type ThemeProviderProps } from "next-themes";

// This is a wrapper around the next-themes provider.
// It's marked as a client component, which is necessary for the provider to work.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}