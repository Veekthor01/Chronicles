import Image from "next/image"
import Footer from "@/components/Footer"
import Link from 'next/link'

export const metadata = {
    title: 'BlogPosts',
    description: 'My BlogPosts',
  }
  
export default function BlogPostLayout({ children }) {
    return (
    <section>
        <nav className="w-full z-10 flex flex-row items-center justify-center lg:justify-between p-3 border-b-2 border-b-black bg-gradient-to-r from-green-500 to-indigo-500">
      <Link href="/">
      <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='ml-0 lg:ml-16 w-32 lg:w-40'
        priority
        />
      </Link>
        </nav>
        {children}
        <Footer />
        </section>
        )
  }