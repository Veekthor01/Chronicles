export default async function SignupUser (email, password) {
    const signup = 'http://localhost:5000/signup';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    };
    // Send a POST request to the server to sign up.
    try {
        const response = await fetch(signup, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
};