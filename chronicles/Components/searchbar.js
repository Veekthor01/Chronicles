'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

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
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        className='text-black'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
