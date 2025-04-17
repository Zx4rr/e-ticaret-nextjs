'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { rulmanProducts, categories } from '@/constans'
import ProductItem from '../_components/Product/ProductItem'
import { ProductType } from '@/constans'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState<ProductType[]>([]);
  const [categoryResults, setCategoryResults] = useState<typeof categories>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSearchTerm(query);
    
    // Simulate loading
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      // Ürün araması
      const filteredProducts = rulmanProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      
      // Kategori araması
      const filteredCategories = categories.filter(category => 
        category.title.toLowerCase().includes(query.toLowerCase()) ||
        category.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredProducts);
      setCategoryResults(filteredCategories);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const url = `/search?query=${encodeURIComponent(searchTerm)}`;
      window.location.href = url;
    }
  };

  const totalResultsCount = results.length + categoryResults.length;

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Arama Sonuçları
        </h1>
        <div className="flex items-center space-x-2 text-gray-500">
          <Search className="w-4 h-4" />
          <p>
            <span className="font-semibold">&quot;{query}&quot;</span> için {totalResultsCount} sonuç bulundu
          </p>
        </div>
      </motion.div>

      <div className="mb-8">
        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Aramayı düzenle..."
            className="pl-10 py-6 w-full border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-full"
          />
          <Search className="absolute left-3 top-[calc(50%-1px)] -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <button type="submit" className="hidden">Ara</button>
        </form>
      </div>

      {isLoading ? (
        <motion.div 
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      ) : totalResultsCount > 0 ? (
        <>
          {/* Kategori Sonuçları */}
          {categoryResults.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Kategoriler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categoryResults.map((category) => (
                  <motion.div
                    key={category.href}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <Link href={category.href} className="block h-full">
                      <h3 className="font-medium text-lg mb-2 text-blue-600 dark:text-blue-400">{category.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Ürün Sonuçları */}
          {results.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Ürünler</h2>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {results.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductItem product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Sonuç bulunamadı</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            &quot;{query}&quot; için sonuç bulunamadı. Lütfen farklı anahtar kelimeler ile tekrar deneyin.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default SearchPage