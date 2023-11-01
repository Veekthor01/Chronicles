'use client'
import React, { useState } from 'react';
import SignupUser from './Signup-user/page';

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
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}
