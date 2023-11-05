'use client'
import { useState } from 'react';

export default function GitHubLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    const githubAuthURL = 'http://localhost:5000/auth/github'; // Your backend's GitHub authentication route
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
      <button onClick={handleGitHubLogin} disabled={isLoading} className="bg-indigo-500 text-white py-2 px-4 rounded-lg w-full">
        {isLoading ? 'Logging in...' : 'Log in with GitHub'}
      </button>
    </div>
  );
}
