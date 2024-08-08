import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import RootProvider from '@/app/components/root-provider'

import Footer from './components/footer'
import { Toaster } from './components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | FSW Barber',
    default: 'FSW Barber',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="dark antialiased">
        <RootProvider>
          <ClerkProvider>
            <Toaster richColors />
            {children}
            <Footer />
          </ClerkProvider>
        </RootProvider>
      </body>
    </html>
  )
}
