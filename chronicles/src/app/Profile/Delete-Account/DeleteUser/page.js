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
      if (response.ok) {
        // Status code 2xx indicates success
        await response.json();
        // Returning the actual data that we want to render instead of the object itself
        return { message: 'User deleted successfully' };
      } else {
        // Handle non-2xx status codes
        throw new Error(response.status.toString());
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  