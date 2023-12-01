import Provider from "@/components/provider"
import ThemeToggle from "@/components/themeToggle"

export const metadata = {
    title: 'Forgot Password',
    description: 'Enter your email to reset your password',
  }
  
export default function ForgotPasswordLayout({ children }) {
    return (
    <section>
      <Provider>
        <ThemeToggle />
      </Provider>
      {children}
    </section>
        )
  }