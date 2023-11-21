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
        return data;
      } else {
        // Handle non-2xx status codes
        throw new Error(response.status.toString());
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  