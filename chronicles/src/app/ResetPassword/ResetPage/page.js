'use client'
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function and request to reset password
export default function ResetPassword() {
const [newPassword, setNewPassword] = useState('');
const [error, setError] = useState(null);
const [message, setMessage] = useState(null);
const searchParams = useSearchParams();
const router = useRouter();

const token = searchParams.get('token');

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`${backendUrl}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Response Data:', data);
    if (data.message === 'Password updated successfully.') {
      setMessage('Password updated successfully.');
      setTimeout(() => {
        setMessage('');
        router.push('/Login');
      }, 3000);
    } else {
      setError('Error resetting password:', data.error);
    }
  } catch (error) {
    console.error(error);
    setError('Error resetting password:', error.message);
  }
};

return (
  <div className='min-h-screen flex items-center justify-center'>
    <div className="flex flex-col items-center">
     <div className="max-w-md w-11/12 sm:w-full px-4 sm:px-8 py-10 bg-white dark:bg-slate-800 rounded-md shadow-lg">
    <h2 className='mt-2 text-center text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4 tracking-wide'>Reset your password</h2>
    <h3 className='text-xl mb-8 text-center font-bold text-gray-900 dark:text-gray-200 tracking-wide'>
      Enter your new password here
      </h3>
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="token" value={token} />
      <label className='inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide'>New Password:</label>
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        className="w-full mb-2 bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
        required
      />
      <button type="submit" className='mt-4 bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full tracking-wide'>Reset Password</button>
    </form>
    {error && <p className="text-red-500 text:sm md:text-base italic mt-2">{error}</p>}
      {message && <p className="text-green-500 text:sm md:text-base italic mt-2">{message}</p>}
  </div>
  </div>
  </div>
);
}
