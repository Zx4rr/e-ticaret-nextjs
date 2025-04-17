'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'
import Link from 'next/link'

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false)

  // LocalStorage'dan banner'ın daha önce kapatılıp kapatılmadığını kontrol et
  useEffect(() => {
    const dismissed = localStorage.getItem('demoBannerDismissed')
    if (dismissed) {
      setHasBeenDismissed(true)
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('demoBannerDismissed', 'true')
    setHasBeenDismissed(true)
  }

  // Eğer banner kapatılmışsa, hiçbir şey render etme
  if (hasBeenDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 relative z-50"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                <span className="font-bold">Demo Modu</span> • Bu site demo amaçlı hazırlanmıştır. 
                <span className="hidden sm:inline"> Giriş bilgileri: admin@example.com / admin123</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-xs sm:text-sm whitespace-nowrap hover:underline hidden xs:block">
                Demo Hesap ile Giriş
              </Link>
              <button
                onClick={handleDismiss}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 