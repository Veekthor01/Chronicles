import Link from 'next/link';

async function getOtherPagesOfBlogPosts(page) {
 const blogPostURL = `http://localhost:5000/blogpost?page=${page}`;
  try {
    const response = await fetch(blogPostURL, {
      next: {
        revalidate: 0,
      },
    });
    const data = await response.json();

    if (!data) {
      throw new Error('No blog posts found for page', page);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function BlogPages({ params }) {
  const blogPostResponse = await getOtherPagesOfBlogPosts(params.page);
  const blogPosts = blogPostResponse.blogPosts || []; // Handle empty blogPosts array
  const totalBlogPosts = blogPostResponse.count;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalBlogPosts / 1);
  const currentPage = parseInt(params.page);

  return (
    <div className="flex flex-wrap flex-row justify-center text-black bg-orange-300">
      {blogPosts.map((blogPost) => (
        <div key={blogPost._id} className="bg-white rounded-lg shadow-lg p-6 m-4 w-1/5">
          <Link href={`/BlogPost/${blogPost._id}`}>
            <h1 className="text-xl font-bold">{blogPost.title}</h1>
            <p className="mt-2">{blogPost.content.slice(0, 100)}</p>
          </Link>
          <p className="mt-2">Author: {blogPost.author}</p>
          <p>Published on: {blogPost.timestamp}</p>
        </div>
      ))}

      {blogPosts.length === 0 && <h1 className="text-xl">No blog posts found.</h1>}

        <div className="flex flex-row justify-between mt-4">
        {currentPage > 1 && ( // Check if the current page is greater than 1
          <Link href={`/BlogPost/BlogPages/${currentPage - 1}`}>
            <p className="text-blue-500">Previous Page</p>
          </Link>
        )}

        {currentPage < totalPages && ( // Check if the current page is less than the total pages
            <Link href={`/BlogPost/BlogPages/${currentPage + 1}`}>
                <p className="text-blue-500">Next Page</p>
            </Link>
            )}
    </div>
        {/*generate an array of page numbers for pagination*/}
    <div className="mt-4">
        <ul className="flex justify-center">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1}>
              <Link href={`/BlogPages/${index + 1}`}>
                <p className={`text-blue-500 ${index + 1 === currentPage ? 'font-bold' : ''}`}>
                  {index + 1}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
