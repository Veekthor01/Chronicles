const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function SignupUser (email, password) {
    const signup = `${backendUrl}/signup`;
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
        const response = await fetch(signup, options);
        const data = await response.json();
    
        if (response.ok) {
          // Signup was successful
          return data
        } else {
          // Signup failed
          if (response.status === 400) {
            // Handle specific error messages from the backend
            if (data.message === 'Invalid email format') {
              throw new Error('Invalid email format')
            } else if (data.message === 'Email already taken') {
              throw new Error('Email already taken')
            } else if (data.message === 'Password must be at least 4 characters') {
              throw new Error('Password must be at least 4 characters')
            } else {
              throw new Error(data.message)
            }
          } else {
            throw new Error('Failed to sign up')
          }
        }
      } catch (error) {
        console.error('Error:', error);
        throw error
      }
    };