'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ItemsProps {
  id: number
  label: string
  href: string
}

interface SubNavbarProps {
  items: ItemsProps[]
  className?: string
}

export default function SubNavbar({
  items,
  className
}: SubNavbarProps): JSX.Element | null {
  if (!items || items.length === 0) return null

  return items.length > 1 ?
      <div className="mx-auto flex h-fit w-full max-w-5xl flex-col bg-background px-12 py-6">
        <span className="text-center text-3xl md:ml-3 md:text-start">
          Other tools
        </span>
        <div
          className={cn(
            'flex items-center justify-start overflow-x-auto whitespace-nowrap py-5',
            className
          )}
        >
          {items.map((item) => (
            <SubNavbarItem
              key={item.id}
              label={item.label}
              href={item.href}
            />
          ))}
        </div>
      </div>
    : null
}

interface SubNavbarItemProps {
  label: string
  href: string
}

const SubNavbarItem = ({ label, href }: SubNavbarItemProps): JSX.Element => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'sm:hover:bg-background-hover mx-2 rounded-xl border border-foreground/15 px-3 py-1.5 font-bold transition',
        isActive &&
          'border-primary/50 text-primary sm:hover:bg-primary/5 dark:sm:hover:bg-primary/10'
      )}
    >
      {label}
    </Link>
  )
}
