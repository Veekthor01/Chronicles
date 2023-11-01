export default async function LoginUser (email, password) {
    const login = 'http://localhost:5000/login';
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
        const response = await fetch(login, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
};