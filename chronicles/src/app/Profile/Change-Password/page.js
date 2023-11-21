'use client'
import { useState, useEffect } from 'react';
import ChangePassword from './Password/page';
import { useRouter } from 'next/navigation';
import { checkIsAuthenticated } from '../../../../utils/auth';

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
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
    
        // Redirect the user to the login page on success
        router.push('/User');
      } catch (error) {
        // Handle password change errors
        console.error('Error:', error);
    
        if (error.message === 'Unauthorized') {
          alert('User not authenticated. Please log in.');
        } else if (error.message === 'Current password is incorrect') {
          alert('Current password is incorrect');
        } else if (error.message === 'Password must be at least 4 characters') {
          alert('Password must be at least 4 characters');
        } else {
          alert('Failed to change password');
        }
      }
    };    
    
    return (
        <div className='min-h-screen flex items-center justify-center'>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="max-w-md w-full px-8 py-10 bg-white dark:bg-slate-800 rounded-md shadow-xl">
            <h1 className="mt-8 text-center text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4 tracking-wide">Change Password</h1>
            <div className="mb-4">
              <label className="inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide">Current Password:</label>
              <input
                type="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
              />
            </div>
            <div className="mb-4">
              <label className="inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide">New Password:</label>
              <input
                type="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
              />
            </div>
            <button type="submit" className="mt-4 bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full tracking-wide">Change Password</button>
          </form>
        </div>
      </div>
      
    );
};