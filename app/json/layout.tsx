import SubNavbar from '@/components/sub-navbar'
import { Braces } from 'lucide-react'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* <SubNavbar items={items} /> */}
      <main className="relative flex flex-1 flex-col items-center overflow-hidden">
        {children}
        <Braces className="absolute bottom-0 right-[15%] -z-10 h-auto w-60 translate-y-1/4 rotate-12 opacity-25" />
      </main>
    </>
  )
}
