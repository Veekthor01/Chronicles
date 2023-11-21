import Image from "next/image"

export const metadata = {
    title: 'BlogPosts',
    description: 'My BlogPosts',
  }
  
export default function BlogPostLayout({ children }) {
    return (
    <section>
        <nav className="w-full z-10 flex flex-row items-center justify-between p-3 border-b-2 border-b-black bg-gradient-to-r from-green-500 to-indigo-500">
      <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='ml-16 w-40'
        priority
        />
        </nav>
        {children}
        </section>
        )
  }