import Link from 'next/link';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to fetch blog posts for each page of blog
async function getBlogPosts(page = 1, limit = 8) {
  const blogPostURL = `${backendUrl}/blogpost?page=${page}&limit=${limit}`;
  try {
    const response = await fetch(blogPostURL, {
      next: {
        revalidate: 3600,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to generate static paths for each blog post page
export default async function BlogPosts({ page = 1 }) {
    const blogPostsResponse = await getBlogPosts(page, 8);
    const blogPosts = blogPostsResponse.blogPosts; // Access blogPosts from the response
    const totalBlogPosts = blogPostsResponse.count;
  
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalBlogPosts / 8);

    // Generate an array of page numbers for pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='min-h-screen'>
      <div className="mt-6 mb-6 text-center tracking-wide text-xl font-bold text-neutral-900 dark:text-white">
        <h1>Featured Posts</h1>
      </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {blogPosts.map((blogPost) => (
        <div key={blogPost._id}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 m-4">
          <Link href={`/BlogPost/${blogPost._id}`}>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200 tracking-wide">
              {blogPost.title}
            </h1>
            <p className="mt-2 text-gray-900 dark:text-gray-200 tracking-wide">
              {blogPost.content.slice(0, 200)}
            </p>
            <p className="mt-2 text-gray-900 dark:text-gray-200 tracking-wide">
              Author: {blogPost.author}
            </p>
            <p className="mt-2 text-sm text-gray-900 dark:text-gray-200 tracking-wide">
              Published on: {blogPost.timestamp}
            </p>
          </Link>
        </div>
      ))}
      {blogPosts.length === 0 && (
        <h1 className="text-lg lg:text-xl text-gray-900 dark:text-gray-200 tracking-wide">
          No blog posts found.
        </h1>
      )}
    </div>
            {/* Pagination links */}
        <div className="flex flex-row justify-center mt-4">
        {page > 1 && ( // Check if the current page is greater than 1
          <Link href={`/BlogPost/BlogPages/${page - 1}`}>
            <p className="text-green-600 hover:text-green-500 tracking-wide">Previous Page</p>
          </Link>
        )}

        {page < totalPages && ( // Check if the current page is less than the total pages
          <Link href={`/BlogPost/BlogPages/${page + 1}`}>
            <p className="text-green-600 hover:text-green-500 tracking-wide">Next Page</p>
          </Link>
        )}
      </div>

      {/* Generate dynamic pagination links */}
      <div className="mt-4">
        <ul className="flex justify-center">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className="mx-2">
              <Link href={`/BlogPost/BlogPages/${pageNumber}`}>
                <p className={`text-green border border-green-500 rounded-t-full px-3 py-2 ${pageNumber === page ? 'font-bold bg-green-500 text-white' : ''}`} >
                  {pageNumber}
                  </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}