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
        if (response.ok) {
             await response.json();
             // Returning the actual data that we want to render instead of the object itself
            return { message: 'Logout successful' };
        } else {    
            throw new Error('Failed to logout')
        } 
    } catch (error) {
        console.error('Error:', error);
        throw error
    }                  
};