'use client'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './likes.css';

// Function to like a blog post
export default function LikePost({ blogPost }) {
    const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    // Get likes from local storage when the component mounts
    const storedLikes = localStorage.getItem(`blogpost_likes_${blogPost._id}`);
    if (storedLikes) {
      setLikes(parseInt(storedLikes, 10));
    }

    // Check local storage for user's like status
    const liked = localStorage.getItem(`blogpost_like_${blogPost._id}`);
    if (liked === 'true') {
      setUserLiked(true);
    }
  }, [blogPost._id]);

      const handleLike = () => {
        const newLikeStatus = !userLiked;
      
        if (newLikeStatus) {
          setLikes(likes + 1); // Increment likes when liking
          localStorage.setItem(`blogpost_likes_${blogPost._id}`, likes + 1);
        } else {
          setLikes(likes - 1); // Decrement likes when unliking
          localStorage.setItem(`blogpost_likes_${blogPost._id}`, likes - 1);
        }
      
        setUserLiked(newLikeStatus);
        localStorage.setItem(`blogpost_like_${blogPost._id}`, newLikeStatus);
      };
      
  return (
    <main>
        <div className="flex justify-start items-center">
        <FontAwesomeIcon
        icon={faHeart}
        className={`heart-icon ${userLiked ? 'liked-heart' : 'unliked-heart'}`}
        onClick={handleLike}
      />
          <span className='tracking-wide'>{likes} Likes</span>
        </div>
    </main>
  );
}
