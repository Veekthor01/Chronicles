import Link from 'next/link';
import Footer from '../../../../components/Footer';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function generateMetadata({ params, searchParams }, parent) {
  // Read route params
  const page = params.page;
  // Fetch blog post data
 await getOtherPagesOfBlogPosts(page)
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  // Generate metadata
  return {
    title: 'Chronicles Blog',
    description: 'Exploring the world, one story at a time.',
    url: `/BlogPost/BlogPages/${page}`,
    openGraph: {
      title: 'Chronicles Blog',
      description: 'Exploring the world, one story at a time.',
      url: `/BlogPost/BlogPages/${page}`,
      type: 'article',
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

async function getOtherPagesOfBlogPosts(page) {
 const blogPostURL = `${backendUrl}/blogpost?page=${page}`;
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
    <div className='min-h-screen'>
    <div className="flex flex-wrap flex-row justify-center mt-4">
      {blogPosts.map((blogPost) => (
        <div key={blogPost._id} className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 m-4 w-1/5">
          <Link href={`/BlogPost/${blogPost._id}`}>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200">{blogPost.title}</h1>
            <p className="mt-2 text-gray-900 dark:text-gray-200">{blogPost.content.slice(0, 100)}</p>
          <p className="mt-2 text-gray-900 dark:text-gray-200">Author: {blogPost.author}</p>
          <p className='mt-2 text-gray-900 dark:text-gray-200'>Published on: {blogPost.timestamp}</p>
          </Link>
        </div>
      ))}
      {blogPosts.length === 0 && <h1 className="text-xl text-gray-900 dark:text-gray-200">No blog posts found.</h1>}
        </div>

        <div className="flex flex-row justify-center mt-4 space-x-4">
        {currentPage > 1 && ( // Check if the current page is greater than 1
          <Link href={`/BlogPost/BlogPages/${currentPage - 1}`}>
            <p className="text-green-600 hover:text-green-500">Previous Page</p>
          </Link>
        )}

        {currentPage < totalPages && ( // Check if the current page is less than the total pages
            <Link href={`/BlogPost/BlogPages/${currentPage + 1}`}>
                <p className="text-green-600 hover:text-green-500">Next Page</p>
            </Link>
            )}
    </div>
        {/*generate an array of page numbers for pagination*/}
    <div className="mt-4">
        <ul className="flex justify-center">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1} className="mx-2">
              <Link href={`/BlogPost/BlogPages/${index + 1}`}>
                <p className={`text-green border border-green-500 rounded-t-full px-3 py-2 ${index + 1 === currentPage ? 'font-bold bg-green-500 text-white' : ''}`}>
                  {index + 1}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
