'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroDemoNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900 rounded-xl p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-3">
          <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            Bu bir demo projesidir
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Tüm özellikler ve veriler demo amaçlıdır. Gerçek bir satın alma işlemi gerçekleşmez.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm mt-3">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Tüm özellikler aktif</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Demo hesap ile giriş yapın <span className="font-mono bg-blue-50 dark:bg-blue-900/30 px-1 rounded">admin@example.com / admin123</span></span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Kayıt olabilirsiniz</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Ürün arama, favorileme ve filtreleme</span>
            </div>
          </div>
        </div>
        <div className="md:self-center mt-3 md:mt-0 w-full md:w-auto">
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
              Demo Hesapla Giriş
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
} 