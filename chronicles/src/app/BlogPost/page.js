import Link from 'next/link';

async function getBlogPosts () {
    const blogPosts = 'http://localhost:5000/blogpost'
    try {
        const response = await fetch(blogPosts, {
            next: {
                revalidate: 0
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default async function BlogPosts () {
    const blogPosts = await getBlogPosts();
    return (
        <>
        {blogPosts.map((blogPost) => (
            <div key={blogPost._id}>
                <Link href={`/BlogPost/${blogPost._id}`}>
                <h1>{blogPost.title}</h1>
                <h2>{blogPost.author}</h2>
                <h3>{blogPost.timestamp}</h3>
                <p>{blogPost.content.slice(0, 100)}</p>
                </Link>
            </div>
        ))}
        {blogPosts.length === 0 &&(<h1>No blog posts found.</h1>)}
        </>
    )
};