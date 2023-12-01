'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginUser from './Login-User/page';
import GitHubLogin from './Github-Login/page';
import GoogleLogin from './Google-Login/page';

// Function to handle user login
export default function LoginForm() {
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
      await LoginUser(email, password);
      // Redirect the user to the login page on success
      router.push('/User');
    } catch (error) {
      console.error('Error:', error);

      if (error.message === 'Incorrect email') {
        setEmailError('Incorrect email');
      } else if (error.message === 'Incorrect password') {
        setPasswordError('Incorrect password');
      } else {
        setGeneralError('An error occurred during sign in.');
      }
    }
  };

  return (
    <div className='min-h-screen relative'>
    <div className="flex flex-col items-center justify-center mt-4">
  <form onSubmit={handleSubmit} className="sm:max-w-md w-11/12 sm:w-3/5 px-4 sm:px-8 py-10 bg-white dark:bg-slate-800 rounded-md shadow-lg">
    <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='mx-auto w-24 sm:w-40'
        priority
        />   
    <h1 className="mt-8 text-center text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4 tracking-wide">Sign In</h1>
    {generalError && <p className='text-red-600'>{generalError}</p>}
    <div className="mb-4">
      <label className="inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
        required
      />
      {emailError && <p className='text-red-600'>{emailError}</p>}
    </div>
    <div className="mb-4">
      <label className="inline-block mb-1 text-sm font-medium text-gray-900 dark:text-gray-200 tracking-wide">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-white dark:bg-gray-700 py-2 px-2 rounded-lg border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700"
        required
      />
      {passwordError && <p className='text-red-600'>{passwordError}</p>}
    </div>
    <div className="flex justify-end mt-4">
    <Link href="/ForgotPassword" className='text-indigo-600 dark:text-indigo-300 text-sm hover:underline tracking-wide'>Forgot Password?</Link>
    </div>
    <button type="submit" className="mt-4 bg-indigo-600 text-sm text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full">Sign in to your account</button>
    
      <div className="flex items-center mt-6 mb-6">
    <div className="flex-grow border-t border-gray-900 dark:border-gray-500"></div>
    <span className="mx-4 text-sm sm:text-base text-gray-900 dark:text-gray-400 tracking-wide">or</span>
    <div className="flex-grow border-t border-gray-900 dark:border-gray-500"></div>
  </div>

  <div className="flex flex-col md:flex-row justify-between space-y-3 sm:space-y-0">
  <GitHubLogin />
  <GoogleLogin />
</div>

<div className="flex items-center mt-5 text-xs sm:text-sm">
  <h1 className="mr-1 text-gray-900 dark:text-gray-200 tracking-wide">Don't have an account yet?</h1>
  <Link href="/Signup" className='text-indigo-600 dark:text-indigo-300 hover:underline tracking-wide'>Sign up here</Link>
</div>
  </form>

</div>
</div>
  );
}
