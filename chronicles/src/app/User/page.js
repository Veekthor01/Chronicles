import Image from 'next/image'
import Link from 'next/link'
import BlogPosts from '../BlogPost/page'
import ProfileDropdown from '../Profile/page'

export default function UserPage() {
  return (
    <main>
        <nav className="flex flex-row items-center justify-between p-5 bg-green-500">
      <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={25}
        className=''
        priority
        />   
        <div className="flex flex-row justify-end space-x-4">
        <Link href="/write">Write</Link>
        <ProfileDropdown />
        </div>
        </nav>

        <div className="">
          <BlogPosts />
        </div>
    </main>
  )
};