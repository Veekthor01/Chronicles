'use client'
import React, { useState } from 'react';
import ChangePassword from './Password/page';

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // Call the SignupUser function to sign up the user
        const response = await ChangePassword(currentPassword, newPassword);
    
        if (response) {
            // Handle successful sign-up (e.g., redirect to the user's profile page)
            console.log('User signed in successfully');
            // Redirect or perform other actions as needed
        } else {
            // Handle sign-up errors (e.g., display an error message)
            console.error('Failed to sign in');
        }
        } catch (error) {
        console.error('Error:', error);
        // Handle sign-up errors here
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
    <h1 className="text-2xl font-bold text-center mb-4">Change Password</h1>
    <div className="mb-4">
        <label className="text-gray-600">Current Password:</label>
        <input
        type="currentPassword"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full py-2 px-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-indigo-500"
        />
    </div>
    <div className="mb-4">
        <label className="text-gray-600">New Password:</label>
        <input
        type="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full py-2 px-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-indigo-500"
        />
    </div>
    <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full">Change Password</button>
    </form>
    );
};