import Navbar from '../components/navbar'
import BlogPosts from './BlogPost/page'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
        <div className="relative top-14 sm:top-20 z-0 mb-24 sm:mb-32">
        <div className="flex flex-col sm:flex-row items-center justify-around py-56 max-h-56 bg-gradient-to-r from-green-500 to-indigo-500">
        <div className="w-full sm:w-1/2 max-w-xl">
          <h1 className="text-4xl lg:text-7xl text-slate-900 dark:text-white p-5 leading-normal lg:leading-normal tracking-normal lg:tracking-wide">
            Be Inspired.
          </h1>
          <h1 className="text-3xl lg:text-5xl text-stone-900 dark:text-white p-5 leading-normal lg:leading-normal tracking-normal lg:tracking-wide">
            Inspiring you to think differently.
          </h1>
        </div>
        <div className="w-full sm:w-2/5 max-w-xl">
          <p className="text-3xl lg:text-5xl p-5 text-neutral-900 dark:text-white leading-normal lg:leading-normal tracking-normal lg:tracking-wide">
            Share your stories, thoughts, ideas, and expertise with the world.
          </p>
        </div>
      </div>
      </div>
      
      <div>
        <BlogPosts />
      </div>
        <Footer />
    </main>
  )
};