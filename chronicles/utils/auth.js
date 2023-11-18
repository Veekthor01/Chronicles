// utils/auth.js

export const checkIsAuthenticated = async () => {
    try {
      const response = await fetch('http://localhost:5000/check-auth', {
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
  