export default async function createPost (title, author, content) {
    const blogPosts = 'http://localhost:5000/blogpost';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            author,
            content,
        }),
    };
    // Send a POST request to the server to create a new blog post.
    try {
        const response = await fetch(blogPosts, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
};