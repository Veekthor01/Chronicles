const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function createPost (title, author, content) {
    const blogPosts = `${backendUrl}/blogpost`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies along with the request
        body: JSON.stringify({
            title,
            author,
            content,
        }),
    };
    // Send a POST request to the server to create a new blog post.
    try {
        const response = await fetch(blogPosts, options);
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