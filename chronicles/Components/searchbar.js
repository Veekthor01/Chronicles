'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
        const res = await fetch(`http://localhost:5000/blogpost?search=${searchQuery}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setIsLoading(false);
  
        if (data.length > 0) {
          // Find the blog post that matches the search query
          const matchedBlogPost = data.find((blogPost) =>
            blogPost.title.includes(searchQuery) || blogPost.author.includes(searchQuery)
          );
  
          if (matchedBlogPost) {
            router.push(`/BlogPost/${matchedBlogPost._id}`);
          } else {
            // Handle the case when no matching results are found
            // You can display a message or take other actions here
          }
        } else {
          // Handle the case when no results are found
          // You can display a message or take other actions here
        }
      } catch (error) {
        setError(error);
      }
    }
  };  

  return (
      <div>
      <div className='flex items-center'> {/* Added flex container */}
    <input
      type="text"
      placeholder="Search by title or author"
      value={searchQuery}
      className='py-2 px-2 bg-white dark:bg-gray-700 rounded-lg tracking-wide border text-gray-900 dark:text-gray-200 border-gray-300 focus:outline-none focus:border-indigo-700'
      style={{ marginRight: '0.5rem' }}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button type="button" onClick={handleSearch}> {/* Added margin to the button */}
      <FontAwesomeIcon
        icon={faSearch}
        className="text-gray-200 bg-indigo-600 py-3 px-3 rounded-lg" /* Added background and padding */
      />
    </button>
    </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
