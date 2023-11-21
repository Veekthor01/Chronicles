const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function PasswordForgot(email) {
    const forgotPassword = `${backendUrl}/forgot-password`;
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
