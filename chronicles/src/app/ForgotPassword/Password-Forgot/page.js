export async function PasswordForgot(email) {
    const forgotPassword = 'http://localhost:5000/forgot-password'; // Replace with the actual endpoint
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    };
    
    try {
        const response = await fetch(forgotPassword, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
