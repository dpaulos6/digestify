import { Hash } from "lucide-react"
import Link from "next/link"
import { navbarItems } from "@/data/navbar-items"

export default function Home() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden">
      <section className="flex w-full max-w-7xl flex-col items-center gap-10 px-8 py-12 sm:gap-16 sm:py-16 md:py-24 lg:py-32">
        <span className="max-w-3xl text-center font-bold text-3xl xs:text-5xl tracking-tighter sm:text-6xl md:text-7xl">
          Powerful <span className="text-primary">Hashing Tools</span> for Your
          Needs
        </span>
        <span className="max-w-2xl text-center text-base text-muted-foreground xs:text-lg md:text-2xl">
          Streamline your hashing workflows with our suite of cutting-edge
          tools. Secure your data, optimize your processes, and unlock new
          possibilities.
        </span>
        <div className="flex max-w-5xl flex-wrap justify-center gap-4">
          {navbarItems.map((item) => (
            <Link
              className="flex items-center gap-2 whitespace-nowrap rounded-xl border bg-background px-3 py-1.5 text-sm xs:text-base transition hover:bg-background-hover md:text-lg"
              href={item.href}
              key={item.href}
            >
              <item.icon className="h-3 xs:h-4 w-3 xs:w-4 md:h-5 md:w-5" />
              {item.title}
            </Link>
          ))}
        </div>
      </section>
      <Hash className="-z-10 absolute right-[15%] bottom-0 h-auto w-60 translate-y-1/4 rotate-12 opacity-25" />
    </main>
  )
}
