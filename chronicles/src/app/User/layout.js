import Footer from "@/components/Footer"

export const metadata = {
    title: 'Chronicles Blog',
  description: 'Exploring the world, one story at a time.',
  }
  
export default function UserPageLayout({ children }) {
    return (
    <section>
      {children}
        <Footer />
      </section>
    )
  }