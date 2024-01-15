import type { Metadata } from 'next'
import './globals.css'
import { Footer } from '@/app/Footer'

export const metadata: Metadata = {
  title: 'Zen Koans',
  description: '101 Zen Koans',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-r from-blue-100/10 via-sky-300/10 to-pink-200/10'>{children}
      <Footer />
      </body>
    </html>
  )
}
