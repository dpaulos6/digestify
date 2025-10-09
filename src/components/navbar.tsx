"use client"

import { Menu, Moon, Sun } from "lucide-react"
import { Montserrat } from "next/font/google"
import Link from "next/link"
import { useTheme } from "next-themes"
import type React from "react"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { navbarItems } from "@/data/navbar-items"
import { DigestifyIcon, PaypalIcon } from "@/icons"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

const montserrat = Montserrat({ subsets: ["latin"] })

const XXL_VISIBLE_COUNT = 6

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [screenSize, setScreenSize] = useState("sm")

  useEffect(() => {
    function checkScreenSize() {
      const breakpoints = [
        { name: "2xl", query: "(min-width: 1400px)" },
        { name: "xl", query: "(min-width: 1280px)" },
        { name: "lg", query: "(min-width: 1024px)" },
        { name: "md", query: "(min-width: 768px)" },
        { name: "sm", query: "(max-width: 640px)" }
      ]

      for (const bp of breakpoints) {
        if (window.matchMedia(bp.query).matches) {
          setScreenSize(bp.name)
          return
        }
      }
      setScreenSize("default")
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <header>
      <nav className="z-10 flex w-full items-center justify-between gap-8 border-border border-b bg-background px-4 py-3">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            className="group flex items-center gap-1"
            href="/"
          >
            <DigestifyIcon className="h-10 w-10 text-primary transition group-hover:text-primary/75" />
            <span
              className={cn(
                "hidden font-custom font-semibold text-2xl lowercase transition group-hover:translate-x-1 sm:block",
                montserrat.className
              )}
            >
              Digestify
            </span>
          </Link>
          <div className="flex items-center">
            <div className="hidden items-center md:flex">
              {(() => {
                const XL_VISIBLE_COUNT = 4
                const LG_VISIBLE_COUNT = 3
                const MD_VISIBLE_COUNT = 2
                let visibleCount = 0
                switch (screenSize) {
                  case "2xl":
                    visibleCount = XXL_VISIBLE_COUNT
                    break
                  case "xl":
                    visibleCount = XL_VISIBLE_COUNT
                    break
                  case "lg":
                    visibleCount = LG_VISIBLE_COUNT
                    break
                  case "md":
                    visibleCount = MD_VISIBLE_COUNT
                    break
                  default:
                    visibleCount = 0
                }
                return navbarItems.slice(0, visibleCount).map((item) => (
                  <Link
                    className="rounded-md px-3 py-2 transition hover:bg-background-hover"
                    href={item.href}
                    key={item.title}
                  >
                    {item.title}
                  </Link>
                ))
              })()}
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
                      {(() => {
                        const XL_HIDDEN_COUNT = 2
                        const LG_HIDDEN_COUNT = 3
                        const MD_HIDDEN_COUNT = 4

                        let startIndex = 0
                        switch (screenSize) {
                          case "2xl":
                            startIndex = 0
                            break
                          case "xl":
                            startIndex = navbarItems.length - XL_HIDDEN_COUNT
                            break
                          case "lg":
                            startIndex = navbarItems.length - LG_HIDDEN_COUNT
                            break
                          case "md":
                            startIndex = navbarItems.length - MD_HIDDEN_COUNT
                            break
                          case "sm":
                            startIndex = navbarItems.length
                            break
                          default:
                            startIndex = 0
                        }
                        return navbarItems.slice(startIndex).map((item) => (
                          <ListItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                          >
                            {item.description}
                          </ListItem>
                        ))
                      })()}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            asChild
            className="mr-2 gap-2 rounded-full border-blue-400 hover:bg-background-hover"
            variant="outline"
          >
            <Link href="https://www.paypal.com/donate/?hosted_button_id=NK7E6B9J8RXFN">
              <span>Support</span>
              <PaypalIcon className="size-4" />
            </Link>
          </Button>
          <button
            className="rounded-md p-2 transition hover:bg-background-hover"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light")
            }}
            type="button"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
          <div className="block h-10 sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className="h-10 w-10 rounded-lg p-2 transition hover:bg-background-hover" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navbarItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.title}
                  >
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

function ListItem({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-background-hover hover:text-accent-foreground focus:bg-background-hover focus:text-accent-foreground",
            className
          )}
          href={href ?? "#"}
          {...props}
        >
          <div className="font-medium text-sm leading-none">{title}</div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
