import type { Metadata } from 'next'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'www.gramcircle.ai',
  description: 'Amazaon review writer',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="h-screen w-screen flex flex-col bg-pink-00 justify-between items-center">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
