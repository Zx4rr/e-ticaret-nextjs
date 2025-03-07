'use client'
import React from 'react'

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { categories } from '@/constans'
import { usePathname } from 'next/navigation'

const NavMenu = () => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <div className='flex flex-wrap justify-center items-center py-4 bg-mycolor4 dark:bg-gray-900'>
      <NavigationMenu>
        <NavigationMenuList className='flex flex-wrap justify-center'>
          <NavigationMenuItem className='px-2 md:px-4'>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-mycolor-300 hover:bg-mycolor-400 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${pathname === "/" ? "underline" : ""} `}>
                ANASAYFA
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className='px-2 md:px-4'>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-mycolor-300 hover:bg-mycolor-400 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${pathname === "/about" ? "underline" : ""} `}>
                HAKKIMIZDA
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className='px-2 md:px-4'>
            <NavigationMenuTrigger className={`bg-mycolor-300 hover:bg-mycolor-400 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${pathname.startsWith(`/shop`) ? "underline" : ""} `}>
              ÜRÜNLERİMİZ
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-full gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {categories.map((component) => (
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
          <NavigationMenuItem className='px-2 md:px-4'>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-mycolor-300 hover:bg-mycolor-400 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${pathname === "/contact" ? "underline" : ""} `}>
                İLETİŞİM
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default NavMenu