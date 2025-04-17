'use client'
import React from 'react'
import Image from 'next/image'
import CountUp from 'react-countup'
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CenterProductPage = () => {
  const router = useRouter();

  const handleProductClick = (title: string) => {
    if (title === "RULMAN ÇEŞİTLERİ") {
      router.push('/shop/rulman-cesitleri');
    } else if (title === "HİDROLİK & PNÖMATİK") {
      router.push('/shop/hidrolik-pnomatik');
    }
  };

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

  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto p-6"
    >
      {/* Ürün Kartları */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {products.map((product, index) => (
          <motion.div 
            key={index} 
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => handleProductClick(product.title)}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={300}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white text-center py-4 font-bold text-lg">
              {product.title}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Hakkımızda ve İstatistikler */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 flex flex-col md:flex-row items-center justify-between text-center"
      >
        <motion.div 
          variants={itemVariants}
          className="md:w-1/2 p-8 flex flex-col items-center justify-center"
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            METAL RULMAN HIRDAVAT SAN. VE TİC. LTD. ŞTİ.
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            2000 yılında İstanbul İkitelli&apos;de kurulan firmamız, kurulduğu günden beri emin
            adımlarla sektörün liderliğine ulaşmayı hedeflemektedir. Bu amacımıza ulaşmak ve
            alışılmış sektör dinamiklerinden ayrılmak için kendimize belirlediğimiz ilkelerimiz
            bulunmaktadır.
          </motion.p>
        </motion.div>

        {/* İstatistikler */}
        <motion.div 
          variants={itemVariants}
          className="md:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12 md:mt-0"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative flex flex-col items-center justify-center"
            >
              <motion.div 
                className="w-36 h-36 rounded-full flex items-center justify-center relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-300 dark:border-purple-400"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-200 dark:border-purple-300"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-100 dark:border-purple-200"
                  initial={{ scale: 1.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                />
                <motion.h3 
                  className="text-4xl font-bold text-purple-600 dark:text-purple-400 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                >
                  <CountUp 
                    end={parseInt(stat.value.replace(/\D/g, ''))} 
                    duration={2} 
                    suffix={stat.value.replace(/\d/g, '')}
                  />
                </motion.h3>
              </motion.div>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 font-semibold mt-4 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

const products = [
  {
    title: "RULMAN ÇEŞİTLERİ",
    image: "/slider/rulman.png",
  },
  {
    title: "HİDROLİK & PNÖMATİK",
    image: "/slider/pnomatik.png",
  },
  {
    title: "HIRDAVAT",
    image: "/slider/hirdavat.png",
  },
]

const stats = [
  { value: "100%", label: "Müşteri Memnuniyeti" },
  { value: "600+", label: "Aktif Müşteri" },
  { value: "1.000+", label: "Ürün Çeşidi" },
]

export default CenterProductPage