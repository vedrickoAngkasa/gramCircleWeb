import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// import { ToasterProvider } from '@/components/toaster-provider'
// import { ModalProvider } from '@/components/modal-provider'
import Header from '@/components/header'
// import './globals.css'

const font = Inter({ subsets: ['latin'] });

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
      <body className={font.className}>
        {/* <ToasterProvider />
        <ModalProvider /> */}
        <div className="h-screen w-screen flex flex-col bg-pink-00 justify-between items-center">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
