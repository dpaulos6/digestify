import { Mulish } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

const mulish = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digestify',
  description: 'Digest your data at light-speed!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('flex flex-col min-h-screen', mulish.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
