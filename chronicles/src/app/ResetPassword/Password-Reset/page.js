export async function PasswordReset(token, newPassword) {
    const resetPassword = 'http://localhost:5000/reset-password'; // Replace with the actual endpoint
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
    };

    try {
        const response = await fetch(resetPassword, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
