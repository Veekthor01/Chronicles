'use client'
import React, { useState } from 'react';
import SignupUser from './Signup-user/page';
import GitHubSignup from './Github-Signup/page';
import GoogleSignup from './Google-Signup/page';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the SignupUser function to sign up the user
      const response = await SignupUser(email, password);

      if (response) {
        // Handle successful sign-up (e.g., redirect to the user's profile page)
        console.log('User signed up successfully');
        // Redirect or perform other actions as needed
      } else {
        // Handle sign-up errors (e.g., display an error message)
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle sign-up errors here
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
    <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
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
    <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full">Sign Up</button>
  </form>

  <div className=''>
  <GitHubSignup />
  <GoogleSignup />
</div>

</div>
  );
}
