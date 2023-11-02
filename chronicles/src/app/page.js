import Image from 'next/image'
import Link from 'next/link'
import BlogPosts from './BlogPost/page'
import Footer from './Footer/page'

export default function Home() {
  return (
    <main className="min-h-screen">
     <nav className="flex flex-row items-center justify-between p-3 bg-blue-950">
      <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='ml-16 w-40'
        priority
        />   
        <div className="flex flex-row justify-end space-x-8 bg-slate-900 p-4 mr-16">
        <Link href="/sign-in" className='text-sm'>Sign in</Link>
        <Link href="/sign-up" className='text-sm'>Sign up</Link>
        </div>
        </nav>

        <div className="flex flex-row items-center justify-around py-56 max-h-56 bg-slate-700">
        <div className="bg-yellow-700 w-1/2 max-w-xl">
          <h1 className="text-5xl p-5">
            Be Inspired.
          </h1>
          <h1 className="text-5xl p-5">
            Inspiring you to think differently.
          </h1>
        </div>
        <div className="bg-indigo-950 w-2/5 max-w-xl">
          <p className="text-5xl p-5">
            Share your stories, thoughts, ideas, and expertise with the world.
          </p>
        </div>
      </div>

        <div className="">
          <BlogPosts />
        </div>
        <Footer />
    </main>
  )
};