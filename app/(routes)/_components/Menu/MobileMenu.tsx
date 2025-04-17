'use client'

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, ChevronDown, Heart } from 'lucide-react'
import { categories } from '@/constans'
import Link from 'next/link'
import { useFavorites } from '@/app/context/FavoritesContext'

const MobileMenu = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const { favorites } = useFavorites();

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen)
  }

  return (
    <div className='flex md:hidden'>
      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110 hover:rotate-12 text-white" />
        </SheetTrigger>
        <SheetContent className='p-4 bg-[#1a1f2b] text-white'>
          <div className='flex flex-col mt-8 space-y-6'>
            {/* NavMenu öğelerini burada gösteriyoruz */}
            <Link href="/" className="text-lg font-medium hover:text-blue-400 transition-colors duration-200 transform hover:translate-x-1">
              ANASAYFA
            </Link>
            <Link href="/about" className="text-lg font-medium hover:text-blue-400 transition-colors duration-200 transform hover:translate-x-1">
              HAKKIMIZDA
            </Link>
            <div>
              <button
                onClick={toggleProductsMenu}
                className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-400 transition-colors duration-200"
              >
                ÜRÜNLERİMİZ
                <ChevronDown
                  className={`w-5 h-5 transition-transform transform ${
                    isProductsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isProductsOpen && (
                <div className="ml-4 mt-2 space-y-2 transition-all duration-300 ease-in-out transform opacity-0 translate-y-2">
                  {categories.map((component) => (
                    <Link
                      key={component.title}
                      href={component.href}
                      className="block text-sm hover:text-blue-400 transition-colors duration-200 transform hover:translate-x-1"
                    >
                      {component.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/contact" className="text-lg font-medium hover:text-blue-400 transition-colors duration-200 transform hover:translate-x-1">
              İLETİŞİM
            </Link>
            <Link href="/fav" className="flex items-center text-lg font-medium hover:text-blue-400 transition-colors duration-200 transform hover:translate-x-1">
              <div className="flex items-center relative">
                <Heart className="w-5 h-5 mr-2" />
                FAVORİLERİM
                {favorites.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu