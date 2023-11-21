'use client'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GitHubLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    const githubAuthURL = `${backendUrl}/auth/github`;
    try {
      // Redirect the user to GitHub's authorization page
      window.location.href = githubAuthURL;
    } catch (error) {
      console.error(error);
      // Handle error as needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGitHubLogin} disabled={isLoading} className="border border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 text-sm tracking-wide text-gray-900 dark:text-gray-200 py-2 px-4 rounded-lg w-full">
      <FontAwesomeIcon icon={faGithub} className="mr-2 text-base" />
        {isLoading ? 'Logging in...' : 'Log in with GitHub'}
      </button>
    </div>
  );
}
