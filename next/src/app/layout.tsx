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
      <body>{children}
      <Footer />
      </body>
    </html>
  )
}
