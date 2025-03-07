import React from 'react'
import Image from 'next/image'

const SliderPage = () => {
  return (
    <div className='relative w-full h-0 pb-[17.5%]'>
        <Image 
        src="/slider/slider_1.jpg" 
        alt="Slider" 
        width={1919} 
        height={337} />
    </div>
  )
}

export default SliderPage