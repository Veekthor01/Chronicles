import NewComment from "@/app/Comment/page"
import LikePost from "../../../../Components/likes"

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
          <div className="max-w-4xl mx-auto p-4 mb-11">
            <h1 className="text-3xl font-bold text-center">{blogPost.title}</h1>
            <h2 className="text-lg text-center">{blogPost.author}</h2>
            <h3 className="text-sm text-center text-gray-600">{blogPost.timestamp}</h3>
            <p className="text-base text-center">{blogPost.content}</p>
          </div>

          <div>
            <LikePost blogPost={blogPost} />
          </div>

            <div>
                <NewComment blogPostId={blogPost._id}/>
            </div>

            <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold text-center mb-4">Comments</h2>
            {blogPost && blogPost.comments.length > 0 ? (
                <div className="space-y-4">
                {blogPost.comments.map((comment) => (
                    <div key={comment._id} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-indigo-500 mb-2">{comment.author}</h3>
                    <p className="text-sm text-gray-600 mb-2">{comment.timestamp}</p>
                    <p className="text-base text-black">{comment.content}</p>
                    </div>
                ))}
                </div>
            ) : (
                <h1 className="text-xl text-center">No comments yet.</h1>
            )}
            </div>
        </main>
    )
}