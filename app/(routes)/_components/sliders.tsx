'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const SliderPage = () => {
  return (
    <motion.div 
      className='relative w-full h-0 pb-[17.5%] overflow-hidden'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut"
        }}
      >
        <Image 
          src="/slider/slider_1.jpg" 
          alt="Slider" 
          width={1919} 
          height={337}
          className="object-cover w-full h-full"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default SliderPage