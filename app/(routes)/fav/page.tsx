'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useFavorites } from '@/app/context/FavoritesContext'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id)
    toast.success("Ürün favorilerden kaldırıldı")
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Favorilerim
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Beğendiğiniz ve daha sonra incelemek istediğiniz ürünlerin listesi burada görüntülenir.
          </p>
        </div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16 px-4"
          >
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
              <Heart className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Henüz favori ürününüz yok</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              İlginizi çeken ürünleri favorilere ekleyerek burada listeleyebilirsiniz.
            </p>
            <Link href="/shop/rulman-cesitleri" passHref>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Ürünlere Göz Atın
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="w-full"
              >
                <Card className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-4 pb-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/images/placeholder.jpg"}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <button
                        onClick={() => handleRemoveFavorite(product.id)}
                        className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm">
                      {product.description}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/product/${product.id}`} passHref className="w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        Ürünü İncele
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
} 