import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Mulish } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import Head from "./_head"

const mulish = Mulish({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digestify",
  description: "Digest your data at light-speed!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "relative flex min-h-screen max-w-screen flex-col",
          mulish.className
        )}
        suppressHydrationWarning
      >
        <Head />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
