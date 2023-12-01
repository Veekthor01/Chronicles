'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (searchQuery && searchQuery.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/search?search=${searchQuery}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log('API Response:', data);
        setIsLoading(false);
  
        const blogPosts = data.blogPosts; // Access the array of blog posts

        if (blogPosts.length > 0) {
          const matchedBlogPost = blogPosts.find((blogPost) =>
          blogPost.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blogPost.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
          if (matchedBlogPost) {
            router.push(`/BlogPost/${matchedBlogPost._id}`);
          } else {
            setError('No matching results found');
          }
        } else {
          setError('No matching results found');
        }
      } catch (error) {
        setError(error.message); // Set the error message, not the entire error object
      }
    }
  };  

  return (
      <div>
      <div className='flex items-center'>
    <input
      type="text"
      placeholder="Search by title or author"
      value={searchQuery}
      className='text-xs md:text-base py-2 px-2 w-40 md:w-52 bg-white dark:bg-gray-700 rounded-none md:rounded-lg tracking-wide border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700'
      style={{ marginRight: '0.5rem' }}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button type="button" onClick={handleSearch}>
      <FontAwesomeIcon
        icon={faSearch}
        className="text-gray-200 bg-indigo-600 py-2 px-2 md:py-3 md:px-3 rounded-none md:rounded-lg w-4 h-4"
      />
    </button>
    </div>
      {isLoading && <div>Loading...</div>}
      {error && <div className='text-sm md:text-base'>{error}</div>}
    </div>
  );
}