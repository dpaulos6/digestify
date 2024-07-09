import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="z-10 flex w-full shrink-0 flex-col items-center gap-2 border-t bg-background px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-muted-foreground sm:text-sm md:text-base">
        &copy; 2024 digestify. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link
          href="/"
          className="text-xs underline-offset-4 hover:underline sm:text-sm md:text-base"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="/"
          className="text-xs underline-offset-4 hover:underline sm:text-sm md:text-base"
          prefetch={false}
        >
          Privacy
        </Link>
      </nav>
    </footer>
  )
}
