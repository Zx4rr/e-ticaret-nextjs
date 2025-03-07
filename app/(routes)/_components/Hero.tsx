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
        {CarouselList.map((slider) => {
          console.log(slider.image); // Log the image URL to check if it's valid
          return (
            <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={slider.id}>
              <Image 
                src={slider.image} 
                alt={'slider1'}
                width={100}
                height={100}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  )
}

export default HeroPage