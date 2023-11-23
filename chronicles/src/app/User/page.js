'use client'
import { useRouter } from 'next/navigation';
import AuthNavbar from '../../components/authNavbar'
import BlogPosts from '../BlogPost/page'
import Footer from '../../components/Footer'
import { checkIsAuthenticated } from '../../../utils/auth'
import { useEffect } from 'react';


export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectToLogin = async () => {
      const isAuthenticated = await checkIsAuthenticated();

      if (!isAuthenticated) {
        router.push('/Login');
      }
    };

    redirectToLogin();
  }, [router]); 

    return (
      <main className='min-h-screen'>
        <AuthNavbar />
          <div className="">
            <BlogPosts />
          </div>
          <Footer />
      </main>
    );
}
  

/* "use client"
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import AuthNavbar from '../../components/authNavbar';
import BlogPosts from '../BlogPost/page';
import Footer from '../../components/Footer';
import { checkIsAuthenticated } from '../../../utils/auth';

 Define the UserPage component
export default function UserPage() {
  /State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticated = await checkIsAuthenticated();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Error checking authentication:', error);
         Handle error if needed
      }
    };

    checkAuthentication();
  }, []);

  Render the component content if authentication status is determined
  if (isAuthenticated !== null) {
    if (isAuthenticated) {
      return (
        <main className="min-h-screen">
          <AuthNavbar />
          <div className="">
            <BlogPosts />
          </div>
          <Footer />
        </main>
      );
    } else {
      redirect('/Login');
    }
  }

   Render a loading indicator while authentication status is being checked
  return <div>Loading...</div>;
} */