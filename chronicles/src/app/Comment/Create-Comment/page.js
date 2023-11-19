export default async function CreateComment (author, content, blogPostId) {
    const comments = 'http://localhost:5000/comment';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies along with the request
        body: JSON.stringify({
            author,
            content,
            blogPostId,
        }),
    };
    // Send a POST request to the server to create a comment.
    try {
        const response = await fetch(comments, options);
    
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error(response.status.toString());
        }
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
};