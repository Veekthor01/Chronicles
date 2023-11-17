import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="fixed w-full z-10 flex flex-row items-center justify-between p-3 border-b-2 border-b-black bg-gradient-to-r from-green-500 to-indigo-500">
      <Image
        src="/logo.svg"
        alt='Chronicles Logo'
        width={100}
        height={100}
        className='ml-16 w-40'
        priority
        />   
        <div className="flex flex-row justify-end space-x-8 p-4 mr-16">
        <Link href="/Login" className='text-base text-slate-900 dark:text-white tracking-wide'>Sign in</Link>
        <Link href="/Signup" className='text-base text-slate-900 dark:text-white tracking-wide'>Sign up</Link>
        </div>
        </nav>
    )
    };