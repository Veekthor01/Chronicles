export default async function DeleteAccount() {
    const deleteUser = 'http://localhost:5000/delete-user';
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Send a DELETE request to the server to delete the account.
    try {
      const response = await fetch(deleteUser, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  