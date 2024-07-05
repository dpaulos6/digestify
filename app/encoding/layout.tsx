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
      <main className="flex-1 flex flex-col items-center">{children}</main>
    </>
  )
}
