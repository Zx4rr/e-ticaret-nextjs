'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const AsindiricilarZimparalarPage = () => {
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

  return (
    <div className="min-h-screen bg-[#1a1f2b] py-12 pt-28">
      <div className="container mx-auto px-4">
        {/* Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden mb-12 h-72 md:h-96"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-purple-900/90 z-10"></div>
          <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-20 z-10"></div>
          <Image 
            src="/slider/elektrikli-alet-banner.jpg" 
            alt="Elektrikli El Aletleri" 
            fill 
            className="object-cover scale-110 transform hover:scale-105 transition-transform duration-3000"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-800/40 to-purple-800/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-xl max-w-3xl w-full"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg"
              >
                Asındırıcılar ve Zimparalar
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto"
              >
                Profesyonel ve amatör kullanım için asındırıcılar ve zimparalar
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Information Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-12 text-white"
        >
          <h2 className="text-2xl font-semibold mb-4">Asındırıcılar ve Zimparalar ve Kullanım Alanları</h2>
          <p className="mb-4">
            Asındırıcılar ve zimparalar, hem profesyonel hem de hobi amaçlı kullanımlar için tasarlanmış pratik ve güçlü çözümlerdir. İnşaat, tamirat, ahşap işleme ve metal işleme gibi çeşitli alanlarda ihtiyacınız olan her türlü asındırıcılar ve zimparaları burada bulabilirsiniz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Profesyonel Ekipmanlar</h3>
              <p>Endüstriyel standartlara uygun, uzun süreli yoğun kullanım için tasarlanmış profesyonel asındırıcılar ve zimparalar.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Hobi ve Ev Kullanımı</h3>
              <p>Ev projeleri ve hobi çalışmaları için ideal, kullanımı kolay ve ekonomik asındırıcılar ve zimparalar.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Geniş Aksesuar Yelpazesi</h3>
              <p>Her türlü işlem için gereken uç, disk ve aksesuar çeşitleri ile asındırıcılar ve zimparalarınızın kullanım alanını genişletin.</p>
            </div>
          </div>
        </motion.div>
        
        {/* No Products Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center py-16 px-4"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl w-full border border-white/10 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <svg className="w-24 h-24 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-4"
            >
              Ürün Hazırlık Aşamasında
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8"
            >
            Bu kategoriye ait ürünler yakında eklenecektir. Şu anda asındırıcılar ve zimparalar ürün grubumuzu güncelliyoruz. Kısa süre içinde en kaliteli markalardan oluşan geniş ürün yelpazemiz ile hizmetinizde olacağız.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center gap-4">
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
              >
                <span>Diğer Ürünleri Görüntüle</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
              
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors duration-200"
              >
                <span>Bize Ulaşın</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Brands Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white text-center mb-8">Çalıştığımız Markalar</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['/slider/best.png', '/slider/skf.png', '/slider/loctite.png', '/slider/oerlikon.png', '/slider/iscar.png'].map((brand, index) => (
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

export default AsindiricilarZimparalarPage 