import { Lora } from 'next/font/google'
import './globals.css'
// import font awesome icons to layout page
import "@fortawesome/fontawesome-svg-core";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const frontendUrl = process.env.FRONTEND_URL;

const lora = Lora({
   subsets: ['latin'],
   display: 'swap',
  })

export const metadata = {
  metadataBase: new URL(frontendUrl).origin,
  title: 'Chronicles Blog',
  description: 'Exploring the world, one story at a time.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lora.className} bg-gray-100 dark:bg-slate-900`}> 
          {children}
        </body>
    </html>
  )
}
