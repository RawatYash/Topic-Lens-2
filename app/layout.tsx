import './globals.css'
import type { Metadata } from 'next'
import { SessionProvider } from '@/components/session-provider'

export const metadata: Metadata = {
  title: 'TopicLens',
  description: 'Advanced text analysis and topic clustering application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
