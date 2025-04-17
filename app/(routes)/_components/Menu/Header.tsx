'use client'
import { ModeToggle } from "@/components/ModeToggle";
import { Input } from "@/components/ui/input";
import { Heart, Search, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import NavMenu from "./NavMenu";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import CartMenu from "./Cart";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFavorites } from "@/app/context/FavoritesContext";
import UserMenu from '@/app/components/UserMenu'

const Header = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { favorites } = useFavorites();
   
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`)
    }
  }

  const containerVariants = {
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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-sm"
    >
      <div className="container flex flex-row items-center justify-between p-5">
        <motion.div variants={itemVariants} className="flex items-center">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center"
            >
              <Image
                alt="logo"
                src={'/IconImage/askayafirma.png'}
                width={1080}
                height={1920}
                className="w-24 h-auto md:w-48 md:h-auto lg:w-64 lg:h-auto object-contain transition-all duration-300 hover:opacity-90"
              />
            </motion.div>
          </Link>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="hidden md:flex relative md:min-w-96 lg:w-1/2"
        >
          <motion.div
            className={`relative w-full transition-all duration-300 ${
              isSearchFocused ? 'scale-105' : ''
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`relative overflow-hidden rounded-full shadow-md ${
              isSearchFocused 
                ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-200 dark:shadow-blue-900/30' 
                : 'ring-1 ring-gray-200 dark:ring-gray-700'
            } transition-all duration-300`}>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}>
                <Input 
                  className={`w-full border-none pl-12 py-6 text-base transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md ${
                    isSearchFocused 
                      ? 'text-gray-800 dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      handleSearch()
                    }
                  }}
                  placeholder="Ürün veya kategori ara..."
                />
                <button type="submit" className="hidden">Ara</button>
              </form>
              <motion.div 
                className="absolute left-3 top-[calc(50%-1px)] -translate-y-1/2 pointer-events-none"
                initial={{ scale: 1 }}
                animate={{ 
                  scale: isSearchFocused ? 1.1 : 1,
                  x: isSearchFocused ? 0 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <Search className={`w-5 h-5 ${
                  isSearchFocused 
                    ? 'text-blue-500' 
                    : 'text-gray-400 dark:text-gray-500'
                }`} />
              </motion.div>
              <motion.div
                className="absolute right-2 top-1/2 -translate-y-1/2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  onClick={handleSearch} 
                  variant="ghost" 
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    query.trim() 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  } transition-all duration-300`}
                  disabled={!query.trim()}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
            {isSearchFocused && (
              <motion.div 
                className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-500 dark:text-gray-400 text-center"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Ara ve Enter tuşuna bas
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-row items-center space-x-4"
        >
          <ModeToggle />
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <Link href="/fav">
              <Heart className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </motion.div>

          <CartMenu />

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <UserMenu />
          </motion.div>

          <MobileMenu />
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="hidden md:block"
      >
        <NavMenu />
      </motion.div>
    </motion.div>
  );
};

export default Header;
