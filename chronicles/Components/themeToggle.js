'use client'
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";

export default function ThemeToggle () {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
      }, [])
    
      if (!mounted) {
        return null
      }

    return (
        <div>
            The current theme is: {theme}
            <button onClick={() => setTheme("light")}>Light Mode</button>
            <button onClick={() => setTheme("dark")}>Dark Mode</button>
            <button onClick={() => setTheme("system")}>System Mode</button>
        </div>
    )
};