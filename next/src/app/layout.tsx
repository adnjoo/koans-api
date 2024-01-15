import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
