import SubNavbar from "@/components/sub-navbar"
import { QrCode } from "lucide-react"
import items from "./items.json" with { type: "json" }

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SubNavbar items={items} />
      <main className="relative flex flex-1 flex-col items-center overflow-hidden">
        {children}
        <QrCode className="-z-10 absolute right-[15%] bottom-0 h-auto w-60 translate-y-1/4 rotate-12 opacity-25" />
      </main>
    </>
  )
}
