'use client'
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
const [newPassword, setNewPassword] = useState('');
const searchParams = useSearchParams()

const token = searchParams.get('token');

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Response Data:', data);
    if (data.message === 'Password updated successfully.') {
      alert('Password reset successfully!');
      // You can add navigation or redirect to another page here
    } else {
      alert('Error resetting password:', data.error);
    }
  } catch (error) {
    console.error(error);
    alert('Error resetting password:', error.message);
  }
};

return (
  <div>
    <h1>Reset Password</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="token" value={token} readOnly className='text-black'/>
      <label>New Password:</label>
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        className='text-black'
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  </div>
);
}
