import { categories } from '@/constans'
import { Instagram, TwitterIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  // Ürünlerimizi ikiye bölmek için yarısını alıyoruz
  const half = Math.ceil(categories.length / 2);
  const firstHalf = categories.slice(0, half);
  const secondHalf = categories.slice(half);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
  };

  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        {/* Üst Bölüm */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900 p-8 rounded-2xl shadow-lg mb-8"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <motion.h2 
              className="text-xl font-bold text-white mb-2"
              whileHover={{ scale: 1.05 }}
            >
              FİYAT TEKLİFİ ALIN
            </motion.h2>
            <motion.p 
              className="text-indigo-100 dark:text-indigo-200"
              whileHover={{ scale: 1.05 }}
            >
              Ürünlerimiz hakkında bilgi ve fiyat teklifi almak için bizimle iletişime geçin.
            </motion.p>
          </div>
          <Link href={'/contact'}>
            <motion.button 
              className="bg-gradient-to-r from-white to-gray-100 text-indigo-600 font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 dark:from-gray-800 dark:to-gray-700 dark:text-white border border-indigo-200 dark:border-indigo-700"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              FİYAT TEKLİFİ ALIN
            </motion.button>
          </Link>
        </motion.div>

        {/* Alt Bölüm */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {/* Ürünlerimiz Sol */}
          <motion.div 
            className='space-y-4'
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.h2 
              className='text-xl font-bold text-gray-800 dark:text-white'
              whileHover={{ scale: 1.05 }}
            >
              Ürünlerimiz
            </motion.h2>
            <div className="space-y-2">
              {firstHalf.map((component, index) => (
                <motion.div
                  key={component.title}
                  variants={itemVariants}
                  custom={index}
                >
                  <Link
                    href={component.href}
                    className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    {component.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ürünlerimiz Sağ */}
          <motion.div 
            className='space-y-4'
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.h2 
              className='text-xl font-bold text-gray-800 dark:text-white'
              whileHover={{ scale: 1.05 }}
            >
              Ürünlerimiz
            </motion.h2>
            <div className="space-y-2">
              {secondHalf.map((component, index) => (
                <motion.div
                  key={component.title}
                  variants={itemVariants}
                  custom={index}
                >
                  <Link
                    href={component.href}
                    className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    {component.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* İletişim */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.h3 
              className="text-xl font-bold text-gray-800 dark:text-white mb-4"
              whileHover={{ scale: 1.05 }}
            >
              İLETİŞİM
            </motion.h3>
            <div className="space-y-3">
              <motion.p 
                className="text-gray-600 dark:text-gray-400"
                whileHover={{ scale: 1.02 }}
              >
                <strong className="text-gray-800 dark:text-white">METAL RULMAN HIRDAVAT SAN. VE TİC. LTD. ŞTİ.</strong>
              </motion.p>
              <motion.p 
                className="text-gray-600 dark:text-gray-400"
                whileHover={{ scale: 1.02 }}
              >
                Başakşehir Metal İş Sanayi Sitesi Yolu, D:4<br />
                Blok No.40 İkitelli Organize Sanayi Sitesi<br />
                Başakşehir/İstanbul
              </motion.p>  
              <motion.p 
                className="text-gray-600 dark:text-gray-400"
                whileHover={{ scale: 1.02 }}
              >
                <strong className="text-gray-800 dark:text-white">E-Mail:</strong> info@metalrulman.com
              </motion.p>
              <motion.p 
                className="text-gray-600 dark:text-gray-400"
                whileHover={{ scale: 1.02 }}
              >
                <strong className="text-gray-800 dark:text-white">Telefon:</strong> 0 (212) 671 73 36
              </motion.p>

              {/* Sosyal Medya */}
              <motion.div 
                className="flex space-x-4 mt-4"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  href='https://x.com/home' 
                  target='_blank'
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  <TwitterIcon className="w-6 h-6" />
                </Link>
                <Link 
                  href='https://www.instagram.com/metal_rulman_hirdavat/' 
                  target='_blank'
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Alt Çizgi ve Copyright */}
        <motion.div 
          className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            2025 © Tüm hakları saklıdır.
          </motion.p>
          <motion.p 
            className="text-gray-500 dark:text-gray-500 mt-1"
            whileHover={{ scale: 1.05 }}
          >
            CodeWithMoto | Software
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer