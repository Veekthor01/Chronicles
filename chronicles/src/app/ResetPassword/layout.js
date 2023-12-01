import Provider from "@/components/provider"
import ThemeToggle from "@/components/themeToggle"

export const metadata = {
    title: 'Reset Password',
    description: 'Reset your password',
  }
  
export default function ResetPasswordLayout({ children }) {
    return (
    <section>
      <Provider>
        <ThemeToggle />
      </Provider>
      {children}
      </section>
    )
  }