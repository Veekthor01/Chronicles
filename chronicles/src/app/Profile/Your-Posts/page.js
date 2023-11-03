import Link from 'next/link';

async function getBlogPost (blogPostId) {
    const blogPost = `http://localhost:5000/blogpost/${blogPostId}`
    try {
        const response = await fetch(blogPost, {
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
    const blogPost = await getBlogPost();
    return (
        <div className="flex flex-wrap flex-row justify-center text-black bg-orange-300">
    <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-1/5">
      <Link href={`/BlogPost/${blogPost._id}`}>
      <h1 className="text-xl font-bold">{blogPost.title}</h1>
      <p className="mt-2">{blogPost.content}</p>
      <p className="mt-2">Author: {blogPost.author}</p>
      <p>Published on: {blogPost.timestamp}</p>
        </Link>
    </div>
  {blogPost.length === 0 && <h1 className="text-xl">No blog posts found.</h1>}
</div>
)
};