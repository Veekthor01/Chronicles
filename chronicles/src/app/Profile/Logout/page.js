const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Request to logout user
export default async function Logout () {
    const logout = `${backendUrl}/logout`;
    try {
        const response = await fetch(logout, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data.message;
        } else {
            throw new Error(response.status.toString());
        }
    } catch (error) {
        console.error('Error:', error);
        throw error
    }                  
};