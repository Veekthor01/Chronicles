'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Logout from './Logout/page';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };
    // If the item is active (ie open) then listen for clicks
    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isOpen]);

  // Logout user
  const logoutUser = async () => {
    try {
    await Logout();
    router.push('/'); // Redirect after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="text-base text-slate-900 dark:text-white">Profile</button>
      {isOpen && (
        <ul className="absolute w-44 top-10 right-0 bg-white dark:bg-slate-800 rounded-md shadow-md p-3">
          <li className='mb-3'>
            <Link href="/Profile/Change-Password" className='text-sm tracking-wide text-gray-900 dark:text-gray-200'>
            <FontAwesomeIcon icon={faLock} className='mr-2' />Change Password</Link>
          </li>
          <li className='mb-3'>
            <Link href="/Profile/Delete-Account" className='text-sm tracking-wide text-gray-900 dark:text-gray-200'>
            <FontAwesomeIcon icon={faTrashAlt} className='mr-2' />Delete Account</Link>
          </li>
          <li className='mb-2'>
              <Link href="#" onClick={logoutUser} className='text-sm tracking-wide text-gray-900 dark:text-gray-200'>
              <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' /> Logout
              </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
