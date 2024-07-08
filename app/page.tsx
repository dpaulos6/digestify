import {
  Component,
  FileKey,
  FileLock,
  GraduationCap,
  Hash,
  KeyRound,
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'

const components = [
  {
    title: 'Hashing Tools',
    href: '/hashing',
    icon: Hash
  },
  {
    title: 'Key Generation',
    href: '/keygen',
    icon: KeyRound
  },
  {
    title: 'Encryption & Decryption',
    href: '/',
    icon: FileLock
  },
  {
    title: 'Encoding & Decoding',
    href: '/encoding',
    icon: FileKey
  },
  {
    title: 'Miscellaneous',
    href: '/',
    icon: Component
  },
  {
    title: 'Educational Resources',
    href: '/',
    icon: GraduationCap
  }
]

export default function Home() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-y-hidden">
      <section className="flex w-full max-w-7xl flex-col items-center gap-10 px-8 py-12 sm:gap-16 sm:py-16 md:py-24 lg:py-32">
        <span className="max-w-3xl text-center text-3xl font-bold tracking-tighter xs:text-5xl sm:text-6xl md:text-7xl">
          Powerful <span className="text-primary">Hashing Tools</span> for Your
          Needs
        </span>
        <span className="max-w-2xl text-center text-base text-muted-foreground xs:text-lg md:text-2xl">
          Streamline your hashing workflows with our suite of cutting-edge
          tools. Secure your data, optimize your processes, and unlock new
          possibilities.
        </span>
        <div className="flex max-w-5xl flex-wrap justify-center gap-4">
          {components.map((component, index) => (
            <Link
              key={index}
              href={component.href}
              className="flex items-center gap-2 whitespace-nowrap rounded-xl border px-3 py-1.5 text-sm transition hover:bg-foreground/10 xs:text-base md:text-lg"
            >
              <component.icon className="h-3 w-3 xs:h-4 xs:w-4 md:h-5 md:w-5" />
              {component.title}
            </Link>
          ))}
        </div>
      </section>
      <Hash className="absolute bottom-0 right-[15%] h-auto w-60 translate-y-1/4 rotate-12 opacity-25" />
    </main>
  )
}
