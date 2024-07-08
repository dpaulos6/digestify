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

  return (
    <div
      className={cn(
        'relative flex w-full items-center justify-start overflow-x-auto whitespace-nowrap border-b bg-background px-6 py-3',
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
  )
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
        'mx-2 rounded-md px-2 py-1 transition sm:hover:bg-foreground/10',
        isActive && 'font-bold text-primary'
      )}
    >
      {label}
    </Link>
  )
}
