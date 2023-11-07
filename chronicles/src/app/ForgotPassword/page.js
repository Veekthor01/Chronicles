'use client';
import { useState } from 'react';
import PasswordForgot from './Password-Forgot/page';

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
        <div>
            <h2>Forgot Password</h2>
            <h3>Enter your email address to reset your password.</h3>
            <label className='text-gray-600'>Email:</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleForgotPassword}>Send Reset Link</button>
            <p>{message}</p>
        </div>
    );
}

export default ForgotPassword;
