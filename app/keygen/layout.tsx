import SubNavbar from '@/components/sub-navbar'
import items from './items.json'
import { KeyRound } from 'lucide-react'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SubNavbar items={items} />
      <main className="flex flex-1 flex-col items-center">{children}</main>
      <KeyRound className="absolute bottom-16 right-[15%] -z-10 h-auto w-60 translate-y-1/4 rotate-12 opacity-25" />
    </>
  )
}
