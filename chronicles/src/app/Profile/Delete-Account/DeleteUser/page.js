import { useEffect, useState } from 'react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const DeleteAccount = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const deleteUser = async () => {
      const url = `${backendUrl}/delete-user`;
      const options = {
        method: 'DELETE',
        credentials: 'include', // Send cookies along with the request
        headers: {
          'Content-Type': 'application/json', 
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Not Authorized');
          } else if (response.status === 404) {
            if (data.message === 'User not found') {
              throw new Error('User not found');
            } else {
              throw new Error(data.message);
            }
          } else {
            throw new Error('Failed to delete user');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    deleteUser();
  }, []);
};

export default DeleteAccount;