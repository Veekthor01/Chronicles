'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';
import SignupUser from './Signup-user/page';
import GitHubSignup from './Github-Signup/page';
import GoogleSignup from './Google-Signup/page';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset any previous error messages
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);
    try {
      // Call the SignupUser function to sign up the user
      await SignupUser(email, password);
      // Redirect the user to the login page on success
      router.push('/User');
    } catch (error) {
      // Handle signup errors
      console.error('Error:', error);

      if (error.message === 'Invalid email format') {
        setEmailError('Invalid email format');
      } else if (error.message === 'Email already taken') {
        setEmailError('Email already taken. Please try another one');
      } else if (error.message === 'Password must be at least 4 characters') {
        setPasswordError('Password must be at least 4 characters');
      } else {
        setGeneralError('An error occurred during signup.');
      }
    }
  };


  return (
    <div className='min-h-screen relative'>
    <div className="flex flex-col items-center justify-center mt-4 mb-4">
    <form onSubmit={handleSubmit} className="max-w-md w-3/5 px-8 py-10 bg-white dark:bg-slate-800 rounded-md shadow-xl">
    <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='mx-auto w-40'
        priority
        />   
    <h1 className="mt-8 text-center text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4 tracking-wide">Sign Up</h1>
    {generalError && <p className='text-red-600'>{generalError}</p>}
    <div className="mb-4">
    <label className="inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
      />
      {emailError && <p className='text-red-600'>{emailError}</p>}
    </div>
    <div className="mb-4">
    <label className="inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
        required
      />
      {passwordError && <p className='text-red-600'>{passwordError}</p>}
    </div>
    <button type="submit" className="mt-4 bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full tracking-wide">Sign Up</button>
  
    <div className="flex items-center mt-6 mb-6">
    <div className="flex-grow border-t border-gray-900 dark:border-gray-500"></div>
    <span className="mx-4 text-gray-900 dark:text-gray-400">or</span>
    <div className="flex-grow border-t border-gray-900 dark:border-gray-500"></div>
  </div>

  <div className="flex justify-between">
  <GitHubSignup />
  <GoogleSignup />
</div>

<div className="flex items-center mt-5 text-sm">
  <h1 className="mr-1 text-gray-900 dark:text-gray-200 tracking-wide">Already have an account?</h1>
  <Link href="/Login" className='text-indigo-600 dark:text-indigo-300 hover:underline tracking-wide'>Sign in here</Link>
</div>
  </form>

  </div>
</div>
  );
};
