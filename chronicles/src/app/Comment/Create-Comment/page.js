export default async function CreateComment (author, content, blogPostId) {
    const comments = 'http://localhost:5000/comment';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author,
            content,
            blogPostId,
        }),
    };
    // Send a POST request to the server to create a comment.
    try {
        const response = await fetch(comments, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
};