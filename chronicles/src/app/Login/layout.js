import Provider from "@/components/provider"
import ThemeToggle from "@/components/themeToggle"

export const metadata = {
    title: 'Sign in ',
    description: 'Sign in to your account',
  }
  
export default function LoginLayout({ children }) {
    return (
    <section>
      <Provider>
        <ThemeToggle />
      </Provider>
      {children}
      </section>
    )
  }