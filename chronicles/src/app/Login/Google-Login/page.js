'use client'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to handle Google login
export default function GoogleLogin() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        const googleAuthURL = `${backendUrl}/auth/google`;
        try {
            // Redirect the user to Google's authorization page
            window.location.href = googleAuthURL;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleGoogleLogin} disabled={isLoading} className="border border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 text-sm tracking-wide text-gray-900 dark:text-gray-200 py-2 px-4 rounded-lg w-full">
                <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faGoogle} className="mr-2 text-base w-4 h-4" />
                {isLoading ? 'Logging in...' : 'Sign in with Google'}
            </div>
            </button>
        </div>
    );
};