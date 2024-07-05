import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-1 items-center">
      <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center sm:flex-row gap-6 lg:gap-12">
            <div className="flex flex-col w-full justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center sm:text-start">
                  Powerful Hashing Tools for Your Needs
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl text-center sm:text-start">
                  Streamline your hashing workflows with our suite of
                  cutting-edge tools. Secure your data, optimize your processes,
                  and unlock new possibilities.
                </p>
              </div>
            </div>

            <ShieldCheck className="w-60 h-auto md:w-96 lg:w-[500px] text-primary" />
          </div>
        </div>
      </section>
    </main>
  )
}
