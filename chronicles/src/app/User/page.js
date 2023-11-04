import Image from 'next/image'
import Link from 'next/link'
import BlogPosts from '../BlogPost/page'
import ProfileDropdown from '../Profile/page'
import SearchBar from '../../../Components/searchbar'

export default function UserPage() {
  return (
    <main>
        <nav className="flex flex-row items-center justify-between p-3 bg-green-500">
        <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='ml-16 w-40'
        priority
        /> 
        <SearchBar />  
        <div className="flex flex-row justify-end space-x-8 bg-slate-900 p-4 mr-16">
        <Link href="/write" className='text-sm'>Write</Link>
        <ProfileDropdown />
        </div>
        </nav>

        <div className="">
          <BlogPosts />
        </div>
    </main>
  )
};