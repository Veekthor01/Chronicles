'use client'
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";

// Function to toggle the theme of the app
export default function ThemeToggle () {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
      }, [])
    
      if (!mounted) {
        return <p>Loading Theme...</p>
      }

      const themes = ['system', 'light', 'dark'];

      return (
        <div className="flex justify-end">
          <label htmlFor="theme-select"></label>
          <select
            id="theme-select"
            className="text-sm sm:text-base p-1 sm:p-2 border border-gray-300 rounded-md bg-gray-800 text-gray-400 focus:outline-none focus:border-indigo-500"
            onChange={(e) => setTheme(e.target.value)}
            defaultValue={theme}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme} className="text-sm sm:text-base bg-gray-800 text-gray-400 mb-2">
                {theme}
              </option>
            ))}
          </select>
        </div>
      );
      
};