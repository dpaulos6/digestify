'use client'

import { DigestifyIcon } from '@/icons'
import { cn } from '@/lib/utils'
import { Menu, Moon, Sun } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import React, { useEffect, useState } from 'react'
import { navbarItems } from '@/data/navbar-items'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [screenSize, setScreenSize] = useState('sm')

  useEffect(() => {
    function checkScreenSize() {
      const xxlBreakpoint = window.matchMedia('(min-width: 1400px)')
      const xlBreakpoint = window.matchMedia('(min-width: 1280px)')
      const largeBreakpoint = window.matchMedia('(min-width: 1024px)')
      const mediumBreakpoint = window.matchMedia('(min-width: 768px)')
      const smallBreakpoint = window.matchMedia('(max-width: 640px)')

      if (xxlBreakpoint.matches) {
        setScreenSize('2xl')
      } else if (xlBreakpoint.matches) {
        setScreenSize('xl')
      } else if (largeBreakpoint.matches) {
        setScreenSize('lg')
      } else if (mediumBreakpoint.matches) {
        setScreenSize('md')
      } else if (smallBreakpoint.matches) {
        setScreenSize('sm')
      } else {
        setScreenSize('default')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <header>
      <nav className="z-10 flex w-full items-center justify-between gap-8 border-b border-border bg-background px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-1">
            <DigestifyIcon className="h-10 w-10 text-primary transition group-hover:text-primary/75" />
            <span
              className={cn(
                'font-custom hidden text-2xl font-semibold lowercase transition group-hover:translate-x-1 sm:block',
                montserrat.className
              )}
            >
              Digestify
            </span>
          </Link>
          <div className="flex items-center">
            <div className="hidden items-center md:flex">
              {navbarItems
                .slice(
                  0,
                  screenSize === '2xl'
                    ? 6
                    : screenSize === 'xl'
                      ? 4
                      : screenSize === 'lg'
                        ? 3
                        : screenSize === 'md'
                          ? 2
                          : 0
                )
                .map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-md px-3 py-2 transition hover:bg-background-hover"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
            <NavigationMenu className="hidden sm:block md:hidden 2xl:hidden">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base md:hidden">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuTrigger className="hidden text-base md:flex">
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {navbarItems
                        .slice(
                          screenSize === '2xl'
                            ? 0
                            : screenSize === 'xl'
                              ? navbarItems.length - 2
                              : screenSize === 'lg'
                                ? navbarItems.length - 3
                                : screenSize === 'md'
                                  ? navbarItems.length - 4
                                  : screenSize === 'sm'
                                    ? navbarItems.length
                                    : 0
                        )
                        .map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="rounded-md p-2 transition hover:bg-background-hover"
            onClick={() => {
              setTheme(theme == 'light' ? 'dark' : 'light')
            }}
          >
            {theme == 'light' ? <Moon /> : <Sun />}
          </button>
          <div className="block h-10 sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className="h-10 w-10 rounded-lg p-2 transition hover:bg-border" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navbarItems.map((item, i) => (
                  <Link key={i} href={item.href}>
                    <DropdownMenuItem>
                      {/* <User className="mr-2 h-4 w-4" /> */}
                      <span className="text-base">{item.title}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-background-hover hover:text-accent-foreground focus:bg-background-hover focus:text-accent-foreground',
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
