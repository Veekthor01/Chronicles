'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="text-blue-700 text-sm">Profile</button>
      {isOpen && (
        <ul className="absolute w-60 top-8 right-0 bg-white shadow-md p-2 text-black">
          <li>
            <Link href="/posts">Your Posts</Link>
          </li>
          <li>
            <Link href="/change-password">Change Password</Link>
          </li>
          <li>
            <Link href="/delete">Delete Account</Link>
          </li>
          <li>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
