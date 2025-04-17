'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/app/context/FavoritesContext'
import { Heart, Star, ChevronRight, ZoomIn, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { ReviewForm } from '@/components/ReviewForm'

// Ürün tipi tanımı
interface Specification {
  name: string
  value: string
}

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

interface Product {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  category: string
  stock: number
  specifications: Specification[]
  image: string
  reviews?: Review[]
}

// Örnek ürün verileri (normalde API'den gelecektir)
const dummyProducts: Product[] = [
  {
    id: '1',
    title: 'Bilyalı Rulman X500',
    description: 'Yüksek hızlı endüstriyel makineler için tasarlanmış dayanıklı bilyalı rulman',
    price: 249.99,
    images: [
      '/products/rulman1.png', 
      '/products/rulman2.png', 
      '/products/rulman3.png',
      '/products/rulman4.png'
    ],
    category: 'Bilyalı Rulmanlar',
    stock: 25,
    specifications: [
      { name: 'İç Çap', value: '25mm' },
      { name: 'Dış Çap', value: '52mm' },
      { name: 'Kalınlık', value: '15mm' },
      { name: 'Malzeme', value: 'Çelik' },
      { name: 'Maksimum Hız', value: '5000 RPM' }
    ],
    image: '/products/rulman1.png',
    reviews: [
      {
        id: '101',
        name: 'Ahmet Yılmaz',
        date: '15.04.2023',
        rating: 5,
        comment: 'Harika bir ürün, beklentilerimi karşıladı. Makinelerimizde kullanıyoruz ve performansından çok memnunuz.'
      },
      {
        id: '102',
        name: 'Mehmet Kaya',
        date: '03.05.2023',
        rating: 4,
        comment: 'Dayanıklı ve kaliteli bir rulman. Uzun süre kullanılabilir gibi görünüyor.'
      }
    ]
  },
  {
    id: '2',
    title: 'Makaralı Rulman Y700 Pro',
    description: 'Ağır yük taşıma kapasitesine sahip profesyonel makaralı rulman serisi',
    price: 399.99,
    images: [
      '/products/rulman5.png', 
      '/products/rulman6.png', 
      '/products/rulman7.png',
      '/products/rulman8.png'
    ],
    category: 'Makaralı Rulmanlar',
    stock: 15,
    specifications: [
      { name: 'İç Çap', value: '30mm' },
      { name: 'Dış Çap', value: '62mm' },
      { name: 'Kalınlık', value: '20mm' },
      { name: 'Malzeme', value: 'Paslanmaz Çelik' },
      { name: 'Maksimum Yük', value: '1200kg' }
    ],
    image: '/products/rulman5.png',
    reviews: [
      {
        id: '201',
        name: 'Ali Demir',
        date: '12.03.2023',
        rating: 5,
        comment: 'Oldukça profesyonel bir ürün. Ağır yük taşıyan makinelerimizde sorunsuz çalışıyor.'
      },
      {
        id: '202',
        name: 'Ayşe Yıldız',
        date: '28.04.2023',
        rating: 4,
        comment: 'Makaralı rulman olarak kaliteli ve dayanıklı. Montajı kolay yapıldı.'
      }
    ]
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.productId as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedTab, setSelectedTab] = useState('specifications')
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showZoom, setShowZoom] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  
  // Simulate loading data from API
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundProduct = dummyProducts.find(p => p.id === productId)
      
      if (foundProduct) {
        // LocalStorage'dan kaydedilmiş değerlendirmeleri al
        try {
          const savedReviewsString = localStorage.getItem(`product_reviews_${productId}`)
          if (savedReviewsString) {
            const savedReviews = JSON.parse(savedReviewsString)
            // Mevcut değerlendirmelerle birleştir
            foundProduct.reviews = [...(foundProduct.reviews || []), ...savedReviews]
          }
        } catch (error) {
          console.error('Değerlendirmeler yüklenirken hata oluştu:', error)
        }
      }
      
      setProduct(foundProduct || null)
      setLoading(false)
    }
    
    loadProduct()
  }, [productId])
  
  const handleToggleFavorite = () => {
    if (!product) return
    
    if (isFavorite(+product.id)) {
      removeFavorite(+product.id)
      toast.success('Ürün favorilerden kaldırıldı')
    } else {
      addFavorite(+product.id)
      toast.success('Ürün favorilere eklendi')
    }
  }
  
  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    
    setZoomPosition({ x, y })
  }
  
  const calculateAverageRating = (reviews?: Review[]) => {
    if (!reviews || reviews.length === 0) return 0
    
    const total = reviews.reduce((acc, review) => acc + review.rating, 0)
    return total / reviews.length
  }
  
  // Değerlendirme eklemek için fonksiyon
  const handleReviewSubmit = (reviewData: { name: string; rating: number; comment: string }) => {
    if (!product) return
    
    // Yeni yorumu oluştur
    const newReview = {
      id: `${Date.now()}`, // Unique bir ID
      name: reviewData.name,
      date: new Date().toLocaleDateString('tr-TR'),
      rating: reviewData.rating,
      comment: reviewData.comment
    }
    
    // Ürünün mevcut değerlendirmelerine yeni değerlendirmeyi ekle
    const updatedReviews = product.reviews ? [...product.reviews, newReview] : [newReview]
    
    // LocalStorage'a yeni değerlendirmeyi kaydet
    try {
      // Önce mevcut kaydedilmiş değerlendirmeleri al
      const savedReviewsString = localStorage.getItem(`product_reviews_${productId}`) || '[]'
      const savedReviews = JSON.parse(savedReviewsString)
      
      // Yeni değerlendirmeyi ekle ve kaydet
      const updatedSavedReviews = [...savedReviews, newReview]
      localStorage.setItem(`product_reviews_${productId}`, JSON.stringify(updatedSavedReviews))
    } catch (error) {
      console.error('Değerlendirme kaydedilirken hata oluştu:', error)
    }
    
    // Ürünü güncelle (gerçek bir API'de bu veritabanına kaydedilirdi)
    setProduct({
      ...product,
      reviews: updatedReviews
    })
    
    // Canlı olarak ortalama puanı güncelle
    const newAverageRating = calculateAverageRating(updatedReviews)
    
    // Başarılı mesajını göster ve optimistik UI güncellemesi
    toast.success('Değerlendirmeniz başarıyla eklendi', {
      description: `${newAverageRating.toFixed(1)} ortalama puan (${updatedReviews.length} değerlendirme)`,
    })
    
    // Form görünümünü kapat
    setShowReviewForm(false)
  }
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  // Render not found state
  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 text-center min-h-[70vh] flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h1>
        <p className="mb-6">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/shop/rulman-cesitleri">
          <Button>Ürünlere Geri Dön</Button>
        </Link>
      </div>
    )
  }
  
  // Calculate average rating
  const averageRating = calculateAverageRating(product.reviews)
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 pt-28">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Breadcrumbs */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Anasayfa
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/shop/rulman-cesitleri" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-80 sm:h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleImageHover}
            >
              <Image 
                src={product.images[selectedImage]} 
                alt={product.title}
                fill
                className="object-contain p-4"
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transform: showZoom ? 'scale(1.5)' : 'scale(1)',
                  transition: showZoom ? 'none' : 'transform 0.3s ease-out'
                }}
              />
              <div className="absolute top-2 right-2 z-10">
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full"
                  onClick={() => setShowZoom(!showZoom)}
                >
                  <ZoomIn size={20} />
                </Button>
              </div>
            </motion.div>
            
            {/* Thumbnail Images */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {product.images.map((img, index) => (
                <div 
                  key={index}
                  className={`relative h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === index ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image 
                    src={img} 
                    alt={`${product.title} - Görsel ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{product.title}</h1>
              
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(averageRating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.reviews ? product.reviews.length : 0} değerlendirme
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-gray-700 dark:text-gray-300">
              <p>{product.description}</p>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>2-4 iş günü içinde kargo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>14 gün içinde iade hakkı</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Orijinal kutusuyla gönderim</span>
              </div>
              
              <div className="mt-4 pt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={isFavorite(+product.id) ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFavorite(+product.id) ? 'fill-red-500' : ''}`} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="px-6 pt-4 flex space-x-4 overflow-x-auto">
            <button
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === 'specifications'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setSelectedTab('specifications')}
            >
              Teknik Özellikler
            </button>
            <button
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === 'reviews'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setSelectedTab('reviews')}
            >
              Değerlendirmeler ({product.reviews?.length || 0})
            </button>
          </div>
          
          <div className="p-6">
            {selectedTab === 'specifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4"
              >
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                    <span className="text-gray-600 dark:text-gray-400">{spec.name}</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{spec.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
            
            {selectedTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {!showReviewForm && (
                  <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Müşteri Değerlendirmeleri
                    </h3>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowReviewForm(true)}
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Değerlendirme Yaz
                    </Button>
                  </div>
                )}
                
                {showReviewForm && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Ürünü Değerlendir
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowReviewForm(false)}
                        className="text-gray-500"
                      >
                        İptal
                      </Button>
                    </div>
                    
                    <ReviewForm onReviewSubmit={handleReviewSubmit} />
                  </div>
                )}
                
                {!product.reviews?.length && !showReviewForm ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">Henüz değerlendirme yok</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Bu ürün için ilk değerlendirmeyi siz yapın</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowReviewForm(true)}
                      className="flex items-center gap-2 mx-auto"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Değerlendirme Yaz
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Rating Summary */}
                    {product.reviews && product.reviews.length > 0 && (
                      <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col items-center">
                          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                            {averageRating.toFixed(1)}
                          </div>
                          <motion.div 
                            initial={{ scale: 0.9 }} 
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 ${
                                    star <= Math.round(averageRating)
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </motion.div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {product.reviews.length} değerlendirme
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = product.reviews?.filter(r => r.rating === rating).length || 0
                            const percentage = product.reviews?.length ? (count / product.reviews.length) * 100 : 0
                            
                            return (
                              <div key={rating} className="flex items-center mb-1">
                                <div className="flex items-center w-10">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{rating}</span>
                                  <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                                </div>
                                <div className="flex-1 h-2 mx-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="w-9 text-right">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{count}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Review List */}
                    {product.reviews && product.reviews.length > 0 && (
                      <div className="space-y-4 mt-6">
                        {product.reviews.map((review, index) => (
                          <motion.div 
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="border-b border-gray-200 dark:border-gray-700 pb-4"
                          >
                            <div className="flex justify-between mb-2">
                              <div>
                                <span className="font-medium text-gray-800 dark:text-white">
                                  {review.name}
                                </span>
                                <div className="flex mt-1">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                          star <= review.rating
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {review.date}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                              {review.comment}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Benzer Ürünler</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dummyProducts.filter(p => p.id !== product.id).map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <Link href={`/product/${relatedProduct.id}`} className="block">
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 dark:text-white font-medium mb-2 line-clamp-2">
                      {relatedProduct.title}
                    </h3>
                    <div className="flex justify-end items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= Math.round(calculateAverageRating(relatedProduct.reviews))
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 