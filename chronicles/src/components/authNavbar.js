import Image from 'next/image'
import Link from 'next/link'
import SearchBar from './searchbar'
import ProfileDropdown from '@/app/Profile/page'

// Navbar for authenticated users
export default function AuthNavbar() {
    return (
        <nav className="flex flex-row items-center justify-between p-1 sm:p-3 bg-green-500">
        <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='ml-1 sm:ml-10 lg:ml-16 w-24 sm:w-40'
        priority
        /> 
        <div className='md:block hidden'>
            <SearchBar />
         </div>
        <div className="flex flex-row items-center justify-end space-x-6 sm:space-x-8 p-4 mr-0 sm:mr-10 lg:mr-16">
        <Link href="/New-Post" className='text-sm sm:text-base text-slate-900 dark:text-white tracking-wide'>Write</Link>
        <ProfileDropdown />
        </div>
        </nav>
    )
    };