import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from "@/app/providers/auth";
import Menu from '@/components/Menu';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'DAX - Digital Assets eXplorer',
    description: 'DAX is a Digital Audit Tool to analyse all the Digital Assets in a simple and understandable way.',
    icons: {
        icon: '/dax-logo-icon.png'
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Menu />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
