import AuthNavbar from '../../../Components/authNavbar'
import BlogPosts from '../BlogPost/page'
import Footer from '../../../Components/Footer'

export default function UserPage() {
  return (
    <main className='min-h-screen'>
      <AuthNavbar />
        <div className="">
          <BlogPosts />
        </div>
        <Footer />
    </main>
  )
};