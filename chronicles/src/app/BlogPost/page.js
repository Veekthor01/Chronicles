import Link from 'next/link';

async function getBlogPosts(page = 1, limit = 1) {
  const blogPostURL = `http://localhost:5000/blogpost?page=${page}&limit=${limit}`;
  try {
    const response = await fetch(blogPostURL, {
      next: {
        revalidate: 0,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function BlogPosts({ page = 1 }) {
    const blogPostsResponse = await getBlogPosts(page, 1);
    const blogPosts = blogPostsResponse.blogPosts; // Access blogPosts from the response
    const totalBlogPosts = blogPostsResponse.count;
    console.log('Total Blog Posts:', totalBlogPosts);
  
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalBlogPosts / 1);
    console.log('Page:', page);
    console.log('Total Pages:', totalPages);

    // Generate an array of page numbers for pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap flex-row justify-center text-black bg-orange-300">
      {blogPosts.map((blogPost) => (
        <div
          key={blogPost._id}
          className="bg-white rounded-lg shadow-lg p-6 m-4 w-1/5"
        >
          <Link href={`/BlogPost/${blogPost._id}`}>
            <h1 className="text-xl font-bold">{blogPost.title}</h1>
            <p className="mt-2">{blogPost.content.slice(0, 100)}</p>
          </Link>
          <p className="mt-2">Author: {blogPost.author}</p>
          <p>Published on: {blogPost.timestamp}</p>
        </div>
      ))}

        <div className="flex flex-row justify-between mt-4">
        {page > 1 && ( // Check if the current page is greater than 1
          <Link href={`/BlogPost/BlogPages/${page - 1}`}>
            <p className="text-blue-500">Previous Page</p>
          </Link>
        )}

        {page < totalPages && ( // Check if the current page is less than the total pages
          <Link href={`/BlogPost/BlogPages/${page + 1}`}>
            <p className="text-blue-500">Next Page</p>
          </Link>
        )}
      </div>

      {blogPosts.length === 0 && <h1 className="text-xl">No blog posts found.</h1>}

      {/* Generate dynamic pagination links */}
      <div className="mt-4">
        <ul className="flex justify-center">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className="mx-2">
              <Link href={`/BlogPost/BlogPages/${pageNumber}`}>
                <p className={`text-blue-500 ${pageNumber === page ? 'font-bold' : ''}`} >
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

/*Create an array of page numbers to iterate over in the UI
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    } */
/* import Link from 'next/link';

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
        <div className="flex flex-wrap flex-row justify-center text-black bg-orange-300">
  {blogPosts.map((blogPost) => (
    <div key={blogPost._id} className="bg-white rounded-lg shadow-lg p-6 m-4 w-1/5">
      <Link href={`/BlogPost/${blogPost._id}`}>
      <h1 className="text-xl font-bold">{blogPost.title}</h1>
      <p className="mt-2">{blogPost.content.slice(0, 100)}</p>
      <p className="mt-2">Author: {blogPost.author}</p>
      <p>Published on: {blogPost.timestamp}</p>
        </Link>
    </div>
  ))}
  {blogPosts.length === 0 && <h1 className="text-xl">No blog posts found.</h1>}
</div>
)
};*/