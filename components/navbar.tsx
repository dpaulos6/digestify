'use client'

import { DigestifyIcon } from '@/icons'
import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import React from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Hashing Tools',
    href: '/hashing',
    description:
      'Hash text and files with various algorithms like MD5, SHA-256, and more.'
  },
  {
    title: 'Key Generation',
    href: '/keygen',
    description:
      'Generate secure UUIDs and secrets for any application or need.'
  },
  {
    title: 'Encryption and Decryption',
    href: '/',
    description:
      'Encrypt and decrypt text and files using robust symmetric algorithms.'
  },
  {
    title: 'Encoding and Decoding',
    href: '/',
    description:
      'Efficiently encode and decode text and files in formats like Base64 and Base32.'
  },
  {
    title: 'Miscellaneous',
    href: '/miscellaneous',
    description:
      'Tools for hash comparison, cracking, one-time passwords generation, and more.'
  },
  {
    title: 'Educational Resources',
    href: '/',
    description:
      'Guides and explanations to enhance your understanding of security practices.'
  }
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  return (
    <header>
      <nav className="w-full flex items-center justify-between gap-8 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex gap-1 items-center group">
            <DigestifyIcon className="w-10 h-10 text-primary group-hover:text-primary/75 transition" />
            <span
              className={cn(
                'text-2xl font-semibold font-custom lowercase group-hover:translate-x-1 transition',
                montserrat.className
              )}
            >
              Digestify
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <button
          className="p-2 rounded-md hover:bg-foreground/5 transition"
          onClick={() => {
            setTheme(theme == 'light' ? 'dark' : 'light')
          }}
        >
          {theme == 'light' ? <Moon /> : <Sun />}
        </button>
      </nav>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-foreground/5 hover:text-accent-foreground focus:bg-foreground/10 focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
