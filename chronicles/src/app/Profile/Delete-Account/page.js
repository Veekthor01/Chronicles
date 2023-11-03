'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import DeleteAccount from './DeleteUser/page';

export default function DeleteAccountPage() {
    const router = useRouter();
  
    const handleDeleteAccount = async () => {
      const confirmed = window.confirm(
        'Are you sure you want to delete your account? This action is not reversible.'
      );
  
      if (confirmed) {
        // Call the delete account function to send the request
        try {
          const response = await DeleteAccount();
  
          if (response.status === 'success') {
            alert('Account deleted successfully.');
            router.push('/'); // Redirect to the home page or any other page as needed
          } else {
            alert('Failed to delete account.');
          }
        } catch (error) {
          console.error(error);
          alert('Failed to delete account.');
        }
      }
    };
    return (
        <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Delete Your Account</h1>
        <p className="text-gray-500 mb-4">
          Warning: Deleting your account is not reversible. All your data will be lost.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 w-full"
        >
          Delete Account
        </button>
      </div>
    );
  }