'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import LoginUser from './Login-User/page';
import GitHubLogin from './Github-Login/page';
import GoogleLogin from './Google-Login/page';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the SignupUser function to sign up the user
      const response = await LoginUser(email, password);

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
    <div className=''>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
  <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
  <div className="mb-4">
    <label className="text-gray-600">Email:</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full py-2 px-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-indigo-500"
    />
  </div>
  <div className="mb-4">
    <label className="text-gray-600">Password:</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full py-2 px-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-indigo-500"
    />
  </div>
  <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full">Sign In</button>
</form>

<div className=''>
  <GitHubLogin />
  <GoogleLogin />
</div>
<div>
  <h1>Sign up here</h1>
  <Link href = '/sign-up'>Sign up</Link>
</div>
    </div>
  );
}
