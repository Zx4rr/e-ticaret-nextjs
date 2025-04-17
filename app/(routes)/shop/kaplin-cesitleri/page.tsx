'use client'

import React, { useState, useEffect } from 'react'
import { kaplinProducts, ProductType } from '@/constans'
import Image from 'next/image'
import Link from 'next/link'
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

const KaplinCesitleriPage = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedFilter, setSelectedFilter] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')
  
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
    } else {
      setCurrentPage(1) // Sayfa parametresi yoksa 1. sayfayı göster
    }
  }, [searchParams])
  
  // Sayfa değiştiğinde URL'yi güncelleme
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    
    // URL'yi güncelle
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    
    // Filtre ve arama terimlerini koru
    if (selectedFilter !== 'Tümü') {
      params.set('filter', selectedFilter)
    } else {
      params.delete('filter')
    }
    
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    
    router.push(`?${params.toString()}`)
  }

  // Create a map of product types for filtering
  const productTypes: Record<string, (product: ProductType) => boolean> = {
    'Tümü': () => true,
    'Elastik': (product: ProductType) => product.title.includes('Elastik') || product.description.includes('elastik'),
    'Dişli': (product: ProductType) => product.title.includes('Dişli') || product.description.includes('dişli'),
    'Zincir': (product: ProductType) => product.title.includes('Zincir') || product.description.includes('zincir'),
    'Flanşlı': (product: ProductType) => product.title.includes('Flanş') || product.description.includes('flanş'),
    'Endüstriyel': (product: ProductType) => product.description.includes('endüstriyel') || product.description.includes('sanayi')
  }
  
  // Filter products based on selected filter and search term
  const filteredProducts = kaplinProducts.filter(product => {
    const matchesFilter = productTypes[selectedFilter](product)
    const matchesSearch = searchTerm === '' || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })
  
  // URL yoluyla filtre ve arama parametrelerini uygula
  useEffect(() => {
    const filterParam = searchParams.get('filter')
    const searchParam = searchParams.get('search')
    
    if (filterParam && Object.keys(productTypes).includes(filterParam)) {
      setSelectedFilter(filterParam)
    }
    
    if (searchParam) {
      setSearchTerm(searchParam)
    }
  }, [searchParams])
  
  // Filtre veya arama değiştiğinde URL'yi güncelle
  const updateURLWithFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Sayfa numarasını koru veya sıfırla
    params.set('page', '1')
    setCurrentPage(1)
    
    // Filtre değerini koru
    if (selectedFilter !== 'Tümü') {
      params.set('filter', selectedFilter)
    } else {
      params.delete('filter')
    }
    
    // Arama değerini koru
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    
    router.push(`?${params.toString()}`)
  }
  
  // Toplam sayfa sayısını hesaplama
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  
  // Mevcut sayfada gösterilecek ürünleri hesaplama (sayfalama)
  const currentItems = filteredProducts.slice(
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
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const filters = [
    'Tümü', 
    'Elastik', 
    'Dişli', 
    'Zincir', 
    'Flanşlı',
    'Endüstriyel'
  ]
  
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
    if (totalPages > 1) {
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
    }
    
    return buttons
  }

  return (
    <div className="min-h-screen bg-[#1a1f2b] py-12 pt-28">
      <div className="container mx-auto px-4">
        {/* Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-12 h-64 md:h-80"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
          <Image 
            src="/slider/kaplin-banner.jpg" 
            alt="Kaplin Çeşitleri" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Kaplin Çeşitleri
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-200 max-w-3xl"
            >
              Değirmen ve endüstriyel tesisler için çeşitli kaplin ürünleri ve çözümleri
            </motion.p>
          </div>
        </motion.div>

        {/* Information Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-12 text-white"
        >
          <h2 className="text-2xl font-semibold mb-4">Kaplin Çeşitleri ve Kullanım Alanları</h2>
          <p className="mb-4">
            Kaplinler, iki şaft veya mil arasında tork iletimini sağlayan, aynı zamanda hizalama hatalarını telafi eden ve titreşimleri sönümleyen mekanik bağlantı elemanlarıdır. Endüstriyel uygulamalarda, özellikle değirmen ekipmanlarında, kaplinler güvenilir ve verimli güç aktarımı için kritik öneme sahiptir.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Elastik Kaplinler</h3>
              <p>Elastik malzemeden yapılmış elemanlara sahip kaplinler, titreşimleri sönümler ve hizalama hatalarını tolere eder, böylece bağlı ekipmanın ömrünü uzatır.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Dişli Kaplinler</h3>
              <p>Yüksek tork kapasitesi ve dayanıklılık sunan dişli kaplinler, ağır hizmet uygulamaları için ideal çözümlerdir.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Zincir Kaplinler</h3>
              <p>Zincir kaplinler, yüksek şok yüklerine dayanıklıdır ve bakım gerektirmeden uzun süre çalışabilirler.</p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      // Anlık arama için yorumu kaldırın
                      // updateURLWithFilters()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updateURLWithFilters()
                      }
                    }}
                    placeholder="Ürün ara..." 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={updateURLWithFilters}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Filter Select - For Mobile */}
              <div className="md:hidden">
                <select 
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value)
                    updateURLWithFilters()
                  }}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {filters.map((filter) => (
                    <option key={filter} value={filter} className="bg-gray-800">{filter}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kategori Filtreleri */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedFilter(filter)
                updateURLWithFilters()
              }}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                selectedFilter === filter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Filter Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-white">
            <span className="text-blue-400 font-medium">{filteredProducts.length}</span> ürün bulundu
            {selectedFilter !== 'Tümü' && (
              <span> - Filtre: <span className="text-blue-400">{selectedFilter}</span></span>
            )}
            {searchTerm && (
              <span> - Arama: <span className="text-blue-400">&quot;{searchTerm}&quot;</span></span>
            )}
          </p>
          
          {(selectedFilter !== 'Tümü' || searchTerm) && (
            <button 
              onClick={() => {
                setSelectedFilter('Tümü')
                setSearchTerm('')
                
                // URL'den filtreleri kaldır
                const params = new URLSearchParams(searchParams)
                params.delete('filter')
                params.delete('search')
                params.set('page', '1')
                router.push(`?${params.toString()}`)
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
            >
              <span>Filtreleri Temizle</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Ürünler */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <motion.div 
                key={product.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-white/10 transition-all duration-300 flex flex-col"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative h-64 overflow-hidden bg-black/20">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4 transform transition-transform duration-500"
                    style={{
                      transform: hoveredId === product.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)'
                    }}
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <motion.button 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{product.description}</p>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <Link 
                      href={`/product/${product.id}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <span>Ürün Detayları</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl text-white font-medium mb-2">Sonuç Bulunamadı</h3>
              <p className="text-gray-400">Arama kriterlerinize uygun ürün bulunamadı.</p>
              <button 
                onClick={() => {
                  setSelectedFilter('Tümü')
                  setSearchTerm('')
                  
                  // URL'den filtreleri kaldır
                  const params = new URLSearchParams()
                  router.push(`?${params.toString()}`)
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Tüm Ürünleri Göster
              </button>
            </div>
          )}
        </motion.div>
        
        {/* Sayfalama - Pagination */}
        {filteredProducts.length > itemsPerPage && (
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

        {/* Brands Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white text-center mb-8">Çalıştığımız Markalar</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['/slider/skf.png', '/slider/fag.png', '/slider/iscar.png', '/slider/nsk.png', '/slider/best.png'].map((brand, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="bg-white/5 p-4 rounded-xl"
              >
                <Image
                  src={brand}
                  alt="Brand Logo"
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default KaplinCesitleriPage 