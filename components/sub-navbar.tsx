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
        'flex items-center justify-start w-full relative px-6 py-3 bg-background border-b whitespace-nowrap overflow-x-auto',
        className
      )}
    >
      {items.map((item) => (
        <SubNavbarItem key={item.id} label={item.label} href={item.href} />
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
        'mx-2 px-2 py-1 rounded-md sm:hover:bg-foreground/10 transition',
        isActive && 'font-bold text-primary'
      )}
    >
      {label}
    </Link>
  )
}
