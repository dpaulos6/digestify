import type { ReactNode } from 'react'
import Return from './return'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: ReactNode
  title: string
  orientation?: 'vertical' | 'horizontal'
}

export default function PageWrapper({
  children,
  title,
  orientation = 'vertical'
}: PageWrapperProps) {
  return (
    <section className="my-6 flex flex-1 w-full max-w-5xl flex-col justify-center gap-6 px-4 sm:px-12">
      <Return />
      <span className="my-4 w-fit text-center text-3xl sm:text-start">
        {title}
      </span>
      <div
        className={cn(
          orientation === 'vertical'
            ? 'flex w-full flex-col items-start gap-6'
            : 'grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2'
        )}
      >
        {children}
      </div>
    </section>
  )
}
