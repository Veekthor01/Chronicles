import Provider from "@/components/provider"
import ThemeToggle from "@/components/themeToggle"

export const metadata = {
    title: 'Change Password',
    description: 'Change your password',
  }
  
export default function ChangePasswordLayout({ children }) {
    return (
    <section>
      <Provider>
        <ThemeToggle />
      </Provider>
      {children}
      </section>
    )
  }