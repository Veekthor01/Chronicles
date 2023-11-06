'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordReset } from './Password-Reset/page';

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState(null); // Initialize with null
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('router.query:', router.query);
    if (router.query && router.query.token) {
        setToken(router.query.token);
        console.log('Token:', router.query.token);
    }
}, [router.query]);

  const handleResetPassword = async () => {
    if (token) {
      try {
        const response = await PasswordReset(token, newPassword);
        setMessage(response.message);
      } catch (error) {
        setMessage('An error occurred while processing your request.');
      }
    } else {
      setMessage('Token is missing. Please provide a valid token.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <label className='text-gray-600'>New Password:</label>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className='text-black'
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
}
