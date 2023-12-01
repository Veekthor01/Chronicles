'use client'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GitHubSignup() {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleGitHubSignup = async () => {
        setIsLoading(true);
        const githubAuthURL = `${backendUrl}/auth/github`;
        try {
        // Redirect the user to GitHub's authorization page
        window.location.href = githubAuthURL;
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    };
    
    return (
        <div>
        <button onClick={handleGitHubSignup} disabled={isLoading} className="border border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 text-sm  text-gray-900 dark:text-gray-200 py-2 px-4 rounded-lg w-full">
        <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faGithub} className="mr-2 text-base w-4 h-4" />
            {isLoading ? 'Logging in...' : 'Sign up with GitHub'}
        </div>
        </button>
        </div>
    );
};