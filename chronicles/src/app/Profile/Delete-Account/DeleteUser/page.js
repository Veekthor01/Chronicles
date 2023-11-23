const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function DeleteAccount() {
   const deleteUser = `${backendUrl}/delete-user`;
    const options = {
      method: 'DELETE',
      credentials: 'include', // Send cookies along with the request
      headers: {
        'Content-Type': 'application/json',
      },
    }; 
    // Send a DELETE request to the server to delete the account.
    try {
      const response = await fetch(deleteUser, options);
      const data = await response.json();
      if (response.ok) {
        // Status code 2xx indicates success
        return data
      } else {
        if (response.status === 401) {
          // Unauthorized - user not authenticated
          throw new Error('Not Authorized');
        } else if (response.status === 404) {
          // Handle specific error messages from the backend
          if (data.message === 'User not found') {
            throw new Error('User not found');
          } else {
          throw new Error(data.message);
        }
      } else {
        throw new Error('Failed to delete user')
      }
    }
}  catch (error) {
        console.error('Error:', error);
        throw error;
        }
    };
