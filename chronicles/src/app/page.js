import Image from 'next/image'
import Link from 'next/link'
import BlogPosts from './BlogPost/page'
import Footer from './Footer/page'

export default function Home() {
  return (
    <main className="min-h-screen">
     <nav className="flex flex-row items-center justify-between p-5 bg-red-500">
      <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={25}
        className=''
        priority
        />   
        <div className="flex flex-row justify-end space-x-4">
        <Link href="/sign-in">Sign in</Link>
        <Link href="/sign-up">Sign up</Link>
        </div>
        </nav>

        <div className="flex flex-row items-center justify-around py-52 bg-slate-700">
          <h1 className="bg-yellow-700 text-2xl w-1/2">Chronicles</h1>
          <p className="bg-indigo-950 text-2xl w-2/5">Chronicles is a blog platform for sharing your life story.</p>
        </div>

        <div className="">
          <BlogPosts />
        </div>
        <Footer />
    </main>
  )
};