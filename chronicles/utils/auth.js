const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to Check if the user is authenticated
export const checkIsAuthenticated = async () => {
    const checkAuth = `${backendUrl}/check-auth`;
    try {
      const response = await fetch(checkAuth, {
        next: {
          revalidate: 0,
        },
        method: 'GET',
        credentials: 'include', // Send cookies along with the request
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.isAuthenticated;
      } else {
        console.error('Failed to check authentication status');
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  };
  