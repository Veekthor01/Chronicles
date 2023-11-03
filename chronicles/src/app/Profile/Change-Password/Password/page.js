export default async function ChangePassword (currentPassword, newPassword) {
    const changePassword = 'http://localhost:5000/change-password';
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentPassword,
            newPassword,
        }),
    };
    // Send a POST request to the server to change password.
    try {
        const response = await fetch(changePassword, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
};