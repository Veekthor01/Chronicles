import NewComment from "@/app/Comment/page"

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

export default async function BlogPage ({ params }) {
    const blogPost = await getBlogPost(params.blogPostId);

    return (
        <main>
            <div>
                <h1>{blogPost.title}</h1>
                <h2>{blogPost.author}</h2>
                <h3>{blogPost.timestamp}</h3>
                <p>{blogPost.content}</p>
            </div>

            <div>
                <NewComment blogPostId={blogPost._id}/>
            </div>

            <div>
            {blogPost &&
          blogPost.comments.map((comment) => (
            <div key={comment._id}>
              <h3>{comment.author}</h3>
              <p>{comment.timestamp}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        {blogPost.comments.length === 0 &&(<h1>No comments yet.</h1>)}
         </div>
        </main>
    )
}