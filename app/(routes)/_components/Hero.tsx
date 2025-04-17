'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
  } from "@/components/ui/carousel"
import { CarouselList } from '@/constans'
import Image from 'next/image'
import AutoPlay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'

const HeroPage = () => {
  return (
    <Carousel 
    plugins={[
      AutoPlay({
        delay: 3000,
      })
    ]}
    opts={{
      align: "center",
      loop: true,
    }}>
      <CarouselContent>
        {CarouselList.map((slider, index) => {
          console.log(slider.image); // Log the image URL to check if it's valid
          return (
            <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={slider.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Image 
                  src={slider.image} 
                  alt={'slider1'}
                  width={100}
                  height={100}
                />
              </motion.div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  )
}

export default HeroPage