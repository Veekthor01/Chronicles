import Footer from "@/components/Footer"

export const metadata = {
    title: 'Create New Post',
    description: 'Create a new post',
  }
  
export default function NewPostLayout({ children }) {
    return (
    <section>
      {children}
      <Footer />
      </section>
    )
  }