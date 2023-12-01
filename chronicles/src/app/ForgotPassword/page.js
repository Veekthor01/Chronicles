'use client';
import { useState } from 'react';
import PasswordForgot from './Password-Forgot/page';

// Function to handle forgot password
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await PasswordForgot(email);
            setMessage(response.message);
        } catch (error) {
            setMessage('An error occurred while processing your request.');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="flex flex-col items-center">
            <div className="max-w-md w-11/12 sm:w-full px-4 sm:px-8 py-10 bg-white dark:bg-slate-800 rounded-md shadow-lg">
            <h2 className='mt-2 text-center text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4 tracking-wide'>Forgot Password?</h2>
            <h3 className='mb-8 text-center text-xl font-bold text-gray-900 dark:text-gray-200 tracking-wide'>
                Enter your registered email address to reset your password.
                </h3>
            <label className='inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide'>Email</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-2 bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
                required
            />
            <button onClick={handleForgotPassword} className='mt-4 bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full tracking-wide'>Send Reset Link</button>
            <p className="text-green-500 mt-2 text-center text-sm tracking-wide">{message}</p>
        </div>
        </div>
        </div>
    );
}

export default ForgotPassword;
