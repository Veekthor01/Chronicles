'use client'
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes'

// Function to set the theme of the app
export default function Provider({ children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
      }, [])

    if (!mounted) {
     return <>{children}</>
     }

    return (
        <ThemeProvider attribute='class'>{children}</ThemeProvider>
    )
}