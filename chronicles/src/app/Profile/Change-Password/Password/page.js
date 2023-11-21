const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function ChangePassword (currentPassword, newPassword) {
    const changePassword = `${backendUrl}/changepassword`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies along with the request
        body: JSON.stringify({
            currentPassword,
            newPassword,
        }),
    };
    // Send a POST request to the server to change password.
    try {
        const response = await fetch(changePassword, options);
        const data = await response.json();

        if (response.ok) {
            return data;
          } else {
            // Login failed
            if (response.status === 401) {
              // Unauthorized - user not authenticated
              throw new Error('Unauthorized');
            } else if (response.status === 400) {
              // Handle specific error messages from the backend
              if (data.message === 'Current password is incorrect') {
                throw new Error('Current password is incorrect');
              } else if (data.message === 'Password must be at least 4 characters') {
                throw new Error('Password must be at least 4 characters');
              } else {
                throw new Error(data.message);
              }
            } else {
              throw new Error('Failed to change password');
            }
          }
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      }