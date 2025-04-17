'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { categories } from '@/constans'
import { usePathname } from 'next/navigation'

const NavMenu = () => {
  const pathname = usePathname();

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const hoverVariants = {
    initial: { 
      scale: 1,
      background: "linear-gradient(to right, transparent, transparent)",
      borderColor: "rgb(229, 231, 235)",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
    },
    hover: { 
      scale: 1.02,
      background: "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1))",
      borderColor: "rgb(59, 130, 246)",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      className='flex flex-wrap justify-center items-center py-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-sm'
    >
      <NavigationMenu>
        <NavigationMenuList className='flex flex-wrap justify-center gap-2'>
          <NavigationMenuItem className='px-2 md:px-4'>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink 
                className={cn(
                  "relative px-4 py-2 rounded-xl transition-all duration-300",
                  "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400",
                  "border border-transparent hover:border-blue-200 dark:hover:border-blue-800",
                  pathname === "/" && "text-blue-600 dark:text-blue-400 font-semibold"
                )}
              >
                <motion.span
                  variants={itemVariants}
                  whileHover="hover"
                  className="flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  ANASAYFA
                </motion.span>
                {pathname === "/" && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className='px-2 md:px-4'>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink 
                className={cn(
                  "relative px-4 py-2 rounded-xl transition-all duration-300",
                  "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400",
                  "border border-transparent hover:border-blue-200 dark:hover:border-blue-800",
                  pathname === "/about" && "text-blue-600 dark:text-blue-400 font-semibold"
                )}
              >
                <motion.span
                  variants={itemVariants}
                  whileHover="hover"
                  className="flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  HAKKIMIZDA
                </motion.span>
                {pathname === "/about" && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className='px-2 md:px-4'>
            <NavigationMenuTrigger 
              className={cn(
                "relative px-4 py-2 rounded-xl transition-all duration-300",
                "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400",
                "border border-transparent hover:border-blue-200 dark:hover:border-blue-800",
                pathname.startsWith("/shop") && "text-blue-600 dark:text-blue-400 font-semibold"
              )}
            >
              <motion.span
                variants={itemVariants}
                whileHover="hover"
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                ÜRÜNLERİMİZ
              </motion.span>
              {pathname.startsWith("/shop") && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid w-full gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
              >
                {categories.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </motion.ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className='px-2 md:px-4'>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink 
                className={cn(
                  "relative px-4 py-2 rounded-xl transition-all duration-300",
                  "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400",
                  "border border-transparent hover:border-blue-200 dark:hover:border-blue-800",
                  pathname === "/contact" && "text-blue-600 dark:text-blue-400 font-semibold"
                )}
              >
                <motion.span
                  variants={itemVariants}
                  whileHover="hover"
                  className="flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  İLETİŞİM
                </motion.span>
                {pathname === "/contact" && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="list-none"
    >
      <NavigationMenuLink asChild>
        <motion.a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-gray-100 dark:hover:bg-gray-700",
            "focus:bg-gray-100 dark:focus:bg-gray-700",
            className
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-gray-900 dark:text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
            {children}
          </p>
        </motion.a>
      </NavigationMenuLink>
    </motion.li>
  )
})
ListItem.displayName = "ListItem"

export default NavMenu