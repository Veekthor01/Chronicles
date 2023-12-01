'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthNavbar from '../../components/authNavbar'
import BlogPosts from '../BlogPost/page'
import { checkIsAuthenticated } from '../../../utils/auth'
import Loading from '../loading';

export default function UserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is authenticated
  useEffect(() => {
    const redirectToLogin = async () => {
      const isAuthenticated = await checkIsAuthenticated();

      if (!isAuthenticated) {
        router.push('/Login');
      } else {
        setIsLoading(false);
      }
    };

    redirectToLogin();
  }, [router]); 

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className='min-h-screen'>
      <AuthNavbar />
      <div>
        <BlogPosts />
      </div>
    </main>
  );
}