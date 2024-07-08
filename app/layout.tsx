import { Mulish } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/react'

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
      <body
        className={cn(
          'max-w-screen relative flex min-h-screen flex-col overflow-x-hidden',
          mulish.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <div className="absolute bottom-20 left-2 z-10 hidden max-w-xs rounded-lg border border-amber-400/25 bg-amber-400/25 p-4 text-sm sm:flex md:text-base">
            This is an under development deployment, not production ready!
          </div>
          <Toaster />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
