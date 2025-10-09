"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { JSX } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ButtonGroup } from "./ui/button-group"

type ItemsProps = {
  id: number
  label: string
  href: string
}

type SubNavbarProps = {
  items: ItemsProps[]
  className?: string
}

export default function SubNavbar({
  items,
  className
}: SubNavbarProps): JSX.Element | null {
  if (!items || items.length <= 1) return null

  return (
    <div className="mx-auto flex h-fit w-full max-w-5xl flex-col bg-background px-4 py-6 sm:px-12">
      <span className="text-center text-3xl md:text-start">Other tools</span>
      <ButtonGroup
        className={cn(
          "flex items-center justify-start overflow-x-auto whitespace-nowrap py-5",
          className
        )}
      >
        {items.map((item) => (
          <SubNavbarItem
            href={item.href}
            key={item.id}
            label={item.label}
          />
        ))}
      </ButtonGroup>
    </div>
  )
}

type SubNavbarItemProps = {
  label: string
  href: string
}

const SubNavbarItem = ({ label, href }: SubNavbarItemProps): JSX.Element => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      asChild
      className={cn(
        "hover:bg-foreground/[0.025]",
        isActive && "border bg-foreground/5 hover:bg-foreground/[0.075]"
      )}
      variant={isActive ? "ghost" : "outline"}
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}
