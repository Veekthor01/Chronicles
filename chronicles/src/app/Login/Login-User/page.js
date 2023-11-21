const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function LoginUser (email, password) {
    const login = `${backendUrl}/login`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies along with request
        body: JSON.stringify({
            email,
            password,
        }),
    };
    // Send a POST request to the server to sign up.
    try {
        const response = await fetch(login, options);
        const data = await response.json();

        if (response.ok) {
          // Login was successful
          console.log('Cookies:', document.cookie);
          return data
        } else {
          // Login failed
          if (response.status === 400) {
            // Handle specific error messages from the backend
            if (data.message === 'Incorrect email') {
              throw new Error('Incorrect email')
            } else if (data.message === 'Incorrect password') {
              throw new Error('Incorrect password')
            } else {
              throw new Error(data.message)
            }
          } else {
            throw new Error('Failed to sign in')
          }
        }
      } catch (error) {
        console.error('Error:', error);
        throw error
      }
    };