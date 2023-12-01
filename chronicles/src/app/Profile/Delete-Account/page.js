'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DeleteAccount from './DeleteUser/page';
import { checkIsAuthenticated } from '../../../../utils/auth';
import Logout from '../Logout/page';

export default function DeleteAccountPage() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
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
          const response = DeleteAccount();
          if (response) {
            setMessage('Account deleted successfully');
            setTimeout(() => setMessage(''), 3000);
            router.push('/Login');
            await Logout();
          } else {
            setError('Failed to delete account. Please try again later.');
            setTimeout(() => setError(''), 5000);
          }
        } catch (error) {
          console.error('Error:', error);
      
          if (error.message === 'Not Authorized') {
            setError('Unauthorized. Please login.');
          } else if (error.message === 'User not found') {
            setError('User not found');
          } else {
            setError('Failed to delete account. An unexpected error occured.');
          }
        }
      }      
    };

    return (
      <div className='min-h-screen flex items-center justify-center'>
            <div className="flex flex-col items-center">
            <div className="max-w-md w-11/12 sm:w-full px-4 sm:px-8 py-10 bg-white dark:bg-slate-800 rounded-md shadow-lg">
        <h1 className="mt-2 text-center text-xl sm:text-2xl font-bold mb-4 text-red-600 tracking-wide">Delete Your Account</h1>
        <p className="text-gray-700 dark:text-gray-400 mb-4 tracking-wide">
          Warning: Deleting your account is not reversible. All your data will be lost.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white py-2 px-4 rounded-lg tracking-wide hover:bg-red-700 transition duration-300 w-full"
        >
          Delete Account
        </button>
      </div>
      {error && <p className="text-red-500 text:sm md:text-base italic mt-2">{error}</p>}
      {message && <p className="text-green-500 text:sm md:text-base italic mt-2">{message}</p>}
      </div>
      </div>
    );
  }