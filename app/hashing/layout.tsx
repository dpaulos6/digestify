import SubNavbar from '@/components/sub-navbar'
import items from './items.json'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SubNavbar items={items} />
      <main className="flex flex-1 flex-col items-center">{children}</main>
    </>
  )
}
