import Image from 'next/image'
import Link from 'next/link'
import SearchBar from './searchbar'
import ProfileDropdown from '@/app/Profile/page'

export default function AuthNavbar() {
    return (
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
        <div className="flex flex-row justify-end space-x-8 p-4 mr-16">
        <Link href="/New-Post" className='text-base text-slate-900 dark:text-white tracking-wide'>Write</Link>
        <ProfileDropdown />
        </div>
        </nav>
    )
    };