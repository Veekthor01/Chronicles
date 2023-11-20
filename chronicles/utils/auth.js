const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
        return data.isAuthenticated; // Adjust this based on your server response
      } else {
        console.error('Failed to check authentication status');
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  };
  