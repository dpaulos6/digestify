import { Mulish } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/react'
import { Hash } from 'lucide-react'

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
  const preview = process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE
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
          {preview === 'preview' ?
            <div className="bottom-20 left-2 z-10 mx-auto my-2 flex max-w-xs rounded-lg border border-amber-200 bg-amber-100 p-4 text-sm text-black dark:border-amber-400 dark:bg-amber-200 sm:absolute sm:m-0 md:text-base">
              This is an under development deployment, not production ready!
            </div>
          : null}
          <Toaster />
          <Footer />
          <Hash className="absolute bottom-16 right-[15%] -z-10 h-auto w-60 translate-y-1/4 rotate-12 opacity-25" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
