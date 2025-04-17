import { products } from '@/constans'
import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { useSearchParams, useRouter } from 'next/navigation'

const ProductList = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Sayfalama için durum değişkenleri
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  
  // URL'den sayfa parametresini alma
  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) {
      setCurrentPage(parseInt(pageParam))
    }
  }, [searchParams])
  
  // Sayfa değiştiğinde URL'yi güncelleme
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    
    // URL'yi güncelle
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }
  
  // Toplam sayfa sayısını hesaplama
  const totalPages = Math.ceil(products.length / itemsPerPage)
  
  // Mevcut sayfada gösterilecek ürünleri hesaplama
  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  // Sayfalama butonlarını oluşturma fonksiyonu
  const renderPaginationButtons = () => {
    const buttons = []
    
    // Sayfa sayısı küçükse tüm sayfaları göster
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(i)
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
      return buttons
    }
    
    // Sayfa sayısı büyükse, ellipsis (...) ile göster
    buttons.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handlePageChange(1)
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    )
    
    // Ellipsis başlangıcı
    if (currentPage > 3) {
      buttons.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }
    
    // Mevcut sayfanın etrafındaki sayfaları göster
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      buttons.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(i)
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    
    // Ellipsis sonu
    if (currentPage < totalPages - 2) {
      buttons.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }
    
    // Son sayfa
    buttons.push(
      <PaginationItem key={totalPages}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handlePageChange(totalPages)
          }}
          isActive={currentPage === totalPages}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    )
    
    return buttons
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-white mb-12"
      >
        Rulmanlarımız
      </motion.h1>
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
                {currentItems.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
          >
            <ProductItem product={product}/>
          </motion.div>
                ))}
      </motion.div>
      
      {/* Sayfalama */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage - 1)
                    }} 
                  />
                </PaginationItem>
              )}
              
              {renderPaginationButtons()}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage + 1)
                    }} 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProductList