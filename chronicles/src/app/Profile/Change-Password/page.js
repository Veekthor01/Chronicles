'use client'
import { useState, useEffect } from 'react';
import ChangePassword from './Password/page';
import { useRouter } from 'next/navigation';
import { checkIsAuthenticated } from '../../../../utils/auth';

// Function to change the password
export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
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
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        // Call the changePassword function to change the password
        await ChangePassword(currentPassword, newPassword);
        setMessage('Password changed successfully');
        setTimeout(() => {
          setMessage('');
          router.push('/User');
        }, 3000);
      } catch (error) {
        console.error('Error:', error);
    
        if (error.message === 'Unauthorized') {
          setError('Unauthorized. Please login.');
        } else if (error.message === 'Current password is incorrect') {
          setError('Current password is incorrect');
        } else if (error.message === 'Password must be at least 4 characters') {
          setError('Password must be at least 4 characters');
        } else {
          setError('Failed to change password. Please try again later.');
        }
      }
    };    
    
    return (
        <div className='min-h-screen flex items-center justify-center'>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="max-w-md w-11/12 sm:w-full px-4 sm:px-8 py-10 bg-white dark:bg-slate-800 rounded-md shadow-lg">
            <h1 className="mt-2 text-left text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-200 mb-8 tracking-wide">
            Enter your current and new password
              </h1>
            <div className="mb-4">
              <label className="inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide">Current Password</label>
              <input
                type="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide">New Password</label>
              <input
                type="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
                required
              />
            </div>
            <button type="submit" className="mt-4 bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full tracking-wide">Change Password</button>
            {error && <p className="text-red-500 text:sm md:text-base italic mt-2">{error}</p>}
            {message && <p className="text-green-500 text:sm md:text-base italic mt-2">{message}</p>}
          </form>
        </div>
      </div>
      
    );
};