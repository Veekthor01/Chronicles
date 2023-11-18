import Navbar from '../components/navbar'
import BlogPosts from './BlogPost/page'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
        <div className="relative top-20 z-0 mb-32">
        <div className="flex flex-row items-center justify-around py-56 max-h-56 bg-gradient-to-r from-green-500 to-indigo-500">
        <div className=" w-1/2 max-w-xl">
          <h1 className="text-7xl text-slate-900 dark:text-white p-5 leading-normal tracking-wide">
            Be Inspired.
          </h1>
          <h1 className="text-5xl text-stone-900 dark:text-white p-5 leading-normal tracking-wide">
            Inspiring you to think differently.
          </h1>
        </div>
        <div className=" w-2/5 max-w-xl">
          <p className="text-5xl p-5 text-neutral-900 dark:text-white leading-normal tracking-wide">
            Share your stories, thoughts, ideas, and expertise with the world.
          </p>
        </div>
      </div>
      </div>

      <div className="text-center tracking-wide text-xl font-bold text-neutral-900 dark:text-white">
        <h1>Featured Posts</h1>
      </div>

      <div className="">
        <BlogPosts />
      </div>
        <Footer />
    </main>
  )
};