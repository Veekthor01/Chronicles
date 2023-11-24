/*'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DeleteAccount from './DeleteUser/page';
import { checkIsAuthenticated } from '../../../../utils/auth';
import Logout from '../Logout/page';

export default function DeleteAccountPage() {
    const router = useRouter();

    useEffect(() => {
      const redirectToLogin = async () => {
        const isAuthenticated = await checkIsAuthenticated();
  
        if (!isAuthenticated) {
          router.push('/Login');
        }
      }
  
      redirectToLogin();
    }, [router]);
  
    const handleDeleteAccount = async () => {
      const confirmed = window.confirm(
        'Are you sure you want to delete your account? This action is not reversible.'
      );
  
      if (confirmed) {
        try {
          // Get the user ID from the session
          const response = await DeleteAccount();
          if (response) {
            alert('Account deleted successfully');
            router.push('/');
            await Logout();
          } else {
            alert('Failed to delete account. User not found or an error occurred.');
          }
        } catch (error) {
          console.error('Error:', error);
      
          if (error.message === 'Not Authorized') {
            alert('User not authenticated. Please log in.');
          } else if (error.message === 'User not found') {
            alert('User not found. Please refresh the page.');
          } else {
            alert('Failed to delete account. An unexpected error occurred.');
          }
        }
      }      
    };

    return (
      <div className='min-h-screen flex items-center justify-center'>
            <div className="flex flex-col items-center">
            <div className="max-w-md w-full px-8 py-10 bg-white dark:bg-slate-800 rounded-md shadow-xl">
        <h1 className="mt-2 text-center text-2xl font-bold mb-4 text-red-600 tracking-wide">Delete Your Account</h1>
        <p className="text-gray-500 mb-4 tracking-wide">
          Warning: Deleting your account is not reversible. All your data will be lost.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white py-2 px-4 rounded-lg tracking-wide hover:bg-red-700 transition duration-300 w-full"
        >
          Delete Account
        </button>
      </div>
      </div>
      </div>
    );
  } */