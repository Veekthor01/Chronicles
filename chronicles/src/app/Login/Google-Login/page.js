'use client'
import { useState } from 'react';

export default function GoogleLogin() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        const googleAuthURL = 'http://localhost:5000/auth/google'; // Your backend's Google authentication route
        try {
            // Redirect the user to Google's authorization page
            window.location.href = googleAuthURL;
        } catch (error) {
            console.error(error);
            // Handle error as needed
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleGoogleLogin} disabled={isLoading} className="bg-indigo-500 text-white py-2 px-4 rounded-lg w-full">
                {isLoading ? 'Logging in...' : 'Log in with Google'}
            </button>
        </div>
    );
};