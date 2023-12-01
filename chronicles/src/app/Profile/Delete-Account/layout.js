import Provider from "@/components/provider"
import ThemeToggle from "@/components/themeToggle"

export const metadata = {
    title: 'Delete Account',
    description: 'Delete your account',
  }
  
export default function DeleteLayout({ children }) {
    return (
    <section>
      <Provider>
        <ThemeToggle />
      </Provider>
      {children}
      </section>
    )
  }