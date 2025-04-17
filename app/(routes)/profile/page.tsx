'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { useFavorites } from '@/app/context/FavoritesContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  LogOut, 
  Edit2, 
  Save, 
  X, 
  MapPin,
  Mail,
  Phone,
  Trash2,
  Heart
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'

// Simulated products data - in a real app, this would come from an API
const productsData = [
  {
    id: 1,
    name: 'HQ RULMAN 6201-2RS 12X32X10',
    price: '45.00 ₺',
    image: '/IconImage/product1.png'
  },
  {
    id: 2,
    name: 'KAPLİN ESNEK BAĞLANTI ELEMANI',
    price: '120.00 ₺',
    image: '/IconImage/product2.png'
  },
  {
    id: 3,
    name: 'HİDROLİK HORTUM YS 1-1/2 DN40',
    price: '76.50 ₺',
    image: '/IconImage/product3.png'
  },
  {
    id: 4,
    name: 'SICAK DALDIRMA GALVANİZLİ VİDA',
    price: '62.25 ₺',
    image: '/IconImage/product1.png'
  },
  {
    id: 5,
    name: 'YÜKSEK KALİTE RULMAN 6301',
    price: '85.50 ₺',
    image: '/IconImage/product2.png'
  }
]

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth()
  const { favorites, toggleFavorite, clearFavorites } = useFavorites()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Form state for user profile editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  // Customization preferences with default values
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: false,
    showAddress: true,
    theme: 'system',
    fontSize: 'medium',
    primaryColor: 'blue'
  })

  // Color theme options
  const colorOptions = [
    { id: 'blue', name: 'Mavi', class: 'bg-blue-500' },
    { id: 'green', name: 'Yeşil', class: 'bg-green-500' },
    { id: 'purple', name: 'Mor', class: 'bg-purple-500' },
    { id: 'red', name: 'Kırmızı', class: 'bg-red-500' },
    { id: 'orange', name: 'Turuncu', class: 'bg-orange-500' }
  ]

  // Font size options
  const fontSizeOptions = [
    { id: 'small', name: 'Küçük', class: 'text-sm' },
    { id: 'medium', name: 'Orta', class: 'text-base' },
    { id: 'large', name: 'Büyük', class: 'text-lg' }
  ]

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      // Önce basic user info ile başla
      const baseUserData = {
        name: user.name || '',
        email: user.email || '',
        phone: '0555 123 4567', // Default data
        address: 'İstanbul, Türkiye' // Default data
      };
      
      // Sonra kaydedilmiş localStorage bilgilerini oku
      try {
        const savedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        // Kaydedilmiş bilgileri mevcut verilerle birleştir
        const mergedData = {
          ...baseUserData,
          ...savedUserData
        };
        
        setFormData(mergedData);
      } catch (error) {
        console.error('Error loading saved user data:', error);
        setFormData(baseUserData);
      }
      
      // Aynı şekilde tercihleri de yükle
      try {
        const savedPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        setPreferences(prev => ({
          ...prev,
          ...savedPreferences
        }));
      } catch (error) {
        console.error('Error loading saved preferences:', error);
      }
      
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [user])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Gerçek zamanlı kaydet
    if (name === 'name' || name === 'phone' || name === 'email' || name === 'address') {
      // Değişikliği kullanıcıya bildir
      toast.success(`${name.charAt(0).toUpperCase() + name.slice(1)} bilginiz güncellendi`)
      
      // Local storage'a kaydet (gerçek uygulamada API'ye gönderilir)
      const savedUserData = JSON.parse(localStorage.getItem('userData') || '{}')
      localStorage.setItem('userData', JSON.stringify({
        ...savedUserData,
        [name]: value
      }))
    }
  }

  // Handle preference changes
  const handlePreferenceChange = (key: string, value: unknown) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
    
    // Gerçek zamanlı bildirim
    toast.success(`${key} tercihiniz güncellendi`)
    
    // Local storage'a kaydet (gerçek uygulamada API'ye gönderilir)
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}')
    localStorage.setItem('userPreferences', JSON.stringify({
      ...savedPreferences,
      [key]: value
    }))
  }

  // Get background gradient based on selected color
  const getGradientStyle = () => {
    switch(preferences.primaryColor) {
      case 'green':
        return 'from-green-600 to-green-400 dark:from-green-800 dark:to-green-600'
      case 'purple':
        return 'from-purple-600 to-purple-400 dark:from-purple-800 dark:to-purple-600'
      case 'red':
        return 'from-red-600 to-red-400 dark:from-red-800 dark:to-red-600'
      case 'orange':
        return 'from-orange-600 to-orange-400 dark:from-orange-800 dark:to-orange-600'
      default:
        return 'from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600'
    }
  }

  // Get font size class based on preference
  const getFontSizeClass = () => {
    switch(preferences.fontSize) {
      case 'small': return 'text-sm'
      case 'large': return 'text-lg'
      default: return 'text-base'
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Tüm profil bilgilerini birlikte kaydet
    localStorage.setItem('userData', JSON.stringify(formData))
    
    // UI güncellemesi
    setIsEditing(false)
    toast.success('Tüm profil bilgileriniz kaydedildi')
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    toast.success('Başarıyla çıkış yaptınız')
  }

  // Get actual favorite products
  const getFavoriteProducts = () => {
    if (!favorites.length) return []
    return productsData.filter(product => favorites.includes(product.id))
  }

  // Animation variants
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
        duration: 0.4
      }
    }
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Oturum Açmanız Gerekiyor</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Profil sayfanızı görüntülemek için lütfen giriş yapın.
          </p>
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Giriş Yap
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 ${getFontSizeClass()}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className={`relative bg-gradient-to-r ${getGradientStyle()} p-8`}>
            <div className="absolute inset-0 bg-opacity-20 bg-black" />
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <motion.div 
                variants={itemVariants}
                className={`w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-${preferences.primaryColor}-600 dark:text-${preferences.primaryColor}-400 shadow-lg`}
              >
                {isLoading ? (
                  <Skeleton className="w-24 h-24 rounded-full" />
                ) : (
                  formData?.name?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'
                )}
              </motion.div>
              <div className="text-center md:text-left">
                <motion.h1 
                  variants={itemVariants}
                  className="text-2xl sm:text-3xl font-bold text-white"
                >
                  {isLoading ? (
                    <Skeleton className="h-8 w-48" />
                  ) : (
                    formData.name || 'Kullanıcı'
                  )}
                </motion.h1>
                <motion.div 
                  variants={itemVariants}
                  className="text-blue-100 flex flex-col sm:flex-row sm:gap-6 items-center mt-2"
                >
                  {isLoading ? (
                    <Skeleton className="h-5 w-40" />
                  ) : (
                    <>
                      <div className="flex items-center gap-1">
                        <Mail size={16} />
                        <span>{formData.email}</span>
                      </div>
                      <div className="hidden sm:block text-blue-200">|</div>
                      <div className="flex items-center gap-1">
                        <Phone size={16} />
                        <span>{formData.phone}</span>
                      </div>
                      {preferences.showAddress && (
                        <>
                          <div className="hidden sm:block text-blue-200">|</div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{formData.address}</span>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </motion.div>
              </div>
              <div className="md:ml-auto flex space-x-2">
                <motion.button
                  variants={itemVariants}
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center justify-center rounded-full w-10 h-10 bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  {isEditing ? <X size={18} /> : <Edit2 size={18} />}
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  onClick={handleLogout}
                  className="flex items-center justify-center rounded-full w-10 h-10 bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  <LogOut size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Tabs section */}
          <Tabs defaultValue="profile" className="p-6">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="favorites">Favoriler</TabsTrigger>
              <TabsTrigger value="customize">Özelleştir</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ad Soyad
                        </label>
                        {isEditing ? (
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ad Soyad"
                            className="w-full"
                          />
                        ) : (
                          <div className="py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-between">
                            <span>{formData.name}</span>
                            <button
                              type="button"
                              onClick={() => setIsEditing(true)}
                              className="text-sm text-blue-500 hover:text-blue-600"
                            >
                              Düzenle
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          E-posta
                        </label>
                        {isEditing ? (
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-posta"
                            className="w-full"
                          />
                        ) : (
                          <div className="py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-between">
                            <span>{formData.email}</span>
                            <button
                              type="button"
                              onClick={() => setIsEditing(true)}
                              className="text-sm text-blue-500 hover:text-blue-600"
                            >
                              Düzenle
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Telefon
                        </label>
                        {isEditing ? (
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Telefon"
                            className="w-full"
                          />
                        ) : (
                          <div className="py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-between">
                            <span>{formData.phone}</span>
                            <button
                              type="button"
                              onClick={() => setIsEditing(true)}
                              className="text-sm text-blue-500 hover:text-blue-600"
                            >
                              Düzenle
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Adres
                        </label>
                        {isEditing ? (
                          <Input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Adres"
                            className="w-full"
                          />
                        ) : (
                          <div className="py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                              <span>{formData.address}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsEditing(true)}
                              className="text-sm text-blue-500 hover:text-blue-600"
                            >
                              Düzenle
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end gap-3 mt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="gap-2"
                        >
                          <X size={16} />
                          İptal
                        </Button>
                        <Button type="submit" className={`bg-${preferences.primaryColor}-600 hover:bg-${preferences.primaryColor}-700 text-white gap-2`}>
                          <Save size={16} />
                          Tümünü Kaydet
                        </Button>
                      </div>
                    )}
                  </form>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <motion.h2 
                    variants={itemVariants}
                    className="text-xl font-semibold text-gray-800 dark:text-white"
                  >
                    Favori Ürünleriniz
                  </motion.h2>
                  
                  {favorites.length > 0 && (
                    <motion.button
                      variants={itemVariants}
                      onClick={() => {
                        clearFavorites();
                        toast.success('Tüm favoriler temizlendi');
                      }}
                      className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                      <span>Tümünü Temizle</span>
                    </motion.button>
                  )}
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-60 w-full rounded-lg" />
                    ))}
                  </div>
                ) : favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFavoriteProducts().map((product) => (
                      <motion.div
                        key={product.id}
                        variants={itemVariants}
                        className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://via.placeholder.com/300x300?text=Ürün+Görseli";
                            }}
                          />
                          <button 
                            onClick={() => {
                              toggleFavorite(product.id);
                              toast.success('Favori listesi güncellendi');
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-red-50 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Heart size={16} fill="currentColor" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-blue-600 dark:text-blue-400">{product.price}</div>
                            <Link href={`/product/${product.id}`}>
                              <Button size="sm" variant="outline" className="text-xs">
                                Ürünü Gör
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-10"
                  >
                    <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <Heart className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Henüz favoriniz yok</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">Beğendiğiniz ürünleri favorilere ekleyebilirsiniz.</p>
                    <div className="mt-6">
                      <Link href="/shop/rulman-cesitleri">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Ürünlere Göz At
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
            
            {/* Customize Tab - New */}
            <TabsContent value="customize">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Görünüm Ayarları
                  </h3>
                  
                  {/* Colors */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tema Rengi
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {colorOptions.map(color => (
                        <button
                          key={color.id}
                          onClick={() => handlePreferenceChange('primaryColor', color.id)}
                          className={`w-8 h-8 rounded-full ${color.class} flex items-center justify-center ${
                            preferences.primaryColor === color.id 
                              ? 'ring-2 ring-offset-2 ring-gray-500 dark:ring-gray-300' 
                              : ''
                          }`}
                          title={color.name}
                        >
                          {preferences.primaryColor === color.id && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Font Size */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Yazı Boyutu
                    </label>
                    <div className="flex gap-3">
                      {fontSizeOptions.map(size => (
                        <button
                          key={size.id}
                          onClick={() => handlePreferenceChange('fontSize', size.id)}
                          className={`px-4 py-2 rounded-md border ${
                            preferences.fontSize === size.id
                              ? `bg-${preferences.primaryColor}-100 dark:bg-${preferences.primaryColor}-900 border-${preferences.primaryColor}-500 text-${preferences.primaryColor}-700 dark:text-${preferences.primaryColor}-300`
                              : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <span className={size.class}>{size.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    Bildirim Ayarları
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Uygulama Bildirimleri</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Kampanya ve fırsatlardan haberdar olun</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => handlePreferenceChange('notifications', !preferences.notifications)}
                        className={`${
                          preferences.notifications 
                            ? `bg-${preferences.primaryColor}-100 dark:bg-${preferences.primaryColor}-900 text-${preferences.primaryColor}-700 dark:text-${preferences.primaryColor}-300 border-${preferences.primaryColor}-500` 
                            : ''
                        }`}
                      >
                        {preferences.notifications ? 'Açık' : 'Kapalı'}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">E-posta Bildirimleri</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">E-posta ile bildirim almak istiyorum</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => handlePreferenceChange('emailUpdates', !preferences.emailUpdates)}
                        className={`${
                          preferences.emailUpdates 
                            ? `bg-${preferences.primaryColor}-100 dark:bg-${preferences.primaryColor}-900 text-${preferences.primaryColor}-700 dark:text-${preferences.primaryColor}-300 border-${preferences.primaryColor}-500` 
                            : ''
                        }`}
                      >
                        {preferences.emailUpdates ? 'Açık' : 'Kapalı'}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Profilde Adres Göster</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Profilimde adresimin görünmesine izin ver</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => handlePreferenceChange('showAddress', !preferences.showAddress)}
                        className={`${
                          preferences.showAddress 
                            ? `bg-${preferences.primaryColor}-100 dark:bg-${preferences.primaryColor}-900 text-${preferences.primaryColor}-700 dark:text-${preferences.primaryColor}-300 border-${preferences.primaryColor}-500` 
                            : ''
                        }`}
                      >
                        {preferences.showAddress ? 'Açık' : 'Kapalı'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="pt-4">
                  <Button 
                    onClick={() => {
                      localStorage.setItem('userPreferences', JSON.stringify(preferences))
                      toast.success('Tüm ayarlarınız kaydedildi')
                    }}
                    className={`bg-${preferences.primaryColor}-600 hover:bg-${preferences.primaryColor}-700 text-white`}
                  >
                    Tüm Ayarları Kaydet
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
} 