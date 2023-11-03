import { useRouter } from 'next/navigation';

async function Logout () {
    const logout = 'http://localhost:5000/logout'
    try {
        const response = await fetch(logout, {
            next: {
                revalidate: 0
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default async function LogoutUser () {
    const logout = await Logout();
    const router = useRouter();
    if (logout.status === 'success') {
        alert('User logged out successfully.');
        router.push('/'); // Redirect to the home page or any other page as needed
    } else {
        alert('Failed to log out.');
    }
};