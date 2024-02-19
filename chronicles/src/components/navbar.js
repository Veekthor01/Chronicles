import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="fixed w-full z-10 flex flex-row items-center justify-between p-1 sm:p-3 border-b-2 border-b-black bg-gradient-to-r from-green-500 to-indigo-500">
      <Link href="/">
      <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='ml-1 sm:ml-10 lg:ml-16 w-24 sm:w-40'
        priority
        /> 
        </Link>  
        <div className="flex flex-row justify-end space-x-6 sm:space-x-8 p-4 mr-0 sm:mr-10 lg:mr-16">
        <Link href="/Login" className='text-sm sm:text-base text-slate-900 dark:text-white tracking-wide'>Sign in</Link>
        <Link href="/Signup" className='text-sm sm:text-base text-slate-900 dark:text-white tracking-wide'>Sign up</Link>
        </div>
        </nav>
    )
    };