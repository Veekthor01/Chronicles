import NewComment from "@/app/Comment/page"
import LikePost from "../../../components/likes"
import Footer from "../../../components/Footer"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // add NEXT_PUBLIC_ to access env variables on client side

// Function to generate metadata for each blog post
export async function generateMetadata({ params, searchParams }, parent) {
    // Read route params
    const blogPostId = params.blogPostId;
    // Fetch blog post data
    const blogPost = await getBlogPost(blogPostId);
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    // Generate metadata
    return {
      title: blogPost.title,
      description: blogPost.content.slice(0, 100),
      url: `/Blogpost/${blogPostId}`,
      openGraph: {
        title: blogPost.title,
        description: blogPost.content.slice(0, 100),
        url: `/Blogpost/${blogPostId}`,
        type: 'article',
        publishedTime: blogPost.timestamp,
        author: blogPost.author,
        images: [
          {
            url: '/logo.svg',
            width: 800,
            background: 'black',
            height: 600,
            alt: 'Chronicles Image'
          },
          ...previousImages,
        ],
      },   
    };
  }
  
// Function to fetch blog post data from server
async function getBlogPost (blogPostId) {
    const blogPost = `${backendUrl}/blogpost/${blogPostId}`;
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

// Function to generate static paths for each blog post
export default async function BlogPage ({ params }) {
    const blogPost = await getBlogPost(params.blogPostId);

    return (
        <main className="min-h-screen">
          <div className="max-w-4xl mx-auto p-8 mb-11 mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
            <h1 className="text-4xl mb-6 font-bold text-left text-gray-900 dark:text-gray-200 tracking-wide">{blogPost.title}</h1>
            <h2 className="text-lg mb-3 font-bold text-left text-gray-900 dark:text-gray-200 tracking-wide">{blogPost.author}</h2>
            <h3 className="text-sm text-left text-gray-900 dark:text-gray-400 tracking-wide">{blogPost.timestamp}</h3>
            </div>
            <div className="max-w-4xl mx-auto px-8 pt-7 pb-4 mb-11 mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
            <p className="text-lg text-left mb-8 text-gray-900 dark:text-gray-200 tracking-wide">{blogPost.content}</p>
            
            <div>
            <LikePost blogPost={blogPost} />
          </div>
          </div>

          <div className="max-w-4xl mx-auto p-4 mb-11 mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
                <NewComment blogPostId={blogPost._id}/>
            </div>

            <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold text-center tracking-wide text-gray-900 dark:text-gray-200 mb-4">Comments</h2>
            {blogPost && blogPost.comments.length > 0 ? (
                <div className="space-y-4">
                {blogPost.comments.map((comment) => (
                    <div key={comment._id} className="max-w-4xl mx-auto p-6 mb-11 mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
                    <h3 className="text-lg font-bold text-left text-gray-900 dark:text-gray-200 mb-1 tracking-wide">{comment.author}</h3>
                    <p className="text-xs text-left text-gray-900 dark:text-gray-400 mb-3 tracking-wide">{comment.timestamp}</p>
                    <p className="text-base text-left text-gray-900 dark:text-gray-200 tracking-wide">{comment.content}</p>
                    </div>
                ))}
                </div>
            ) : (
                <h1 className="text-lg text-center text-gray-900 dark:text-gray-200 tracking-wide">No comments yet.</h1>
            )}
            </div>
            <Footer />
        </main>
    )
};