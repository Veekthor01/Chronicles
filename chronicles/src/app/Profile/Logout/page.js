const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
            return data
        } else {    
            throw new Error('Failed to logout')
        } 
    } catch (error) {
        console.error('Error:', error);
        throw error
    }                  
};