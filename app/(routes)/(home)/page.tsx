'use client'
import React from 'react'
import Hero from '../_components/Hero'
import SliderPage from '../_components/sliders'
import CenterProductPage from '../_components/CenterProduct'
import ProductList from '../_components/Product/ProductList'
import HeroDemoNotice from '../_components/HeroDemoNotice'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroDemoNotice />
        <SliderPage/>
        <div className="mt-12">
          <CenterProductPage/>
        </div>
        <div className="mt-12">
          <Hero/>
        </div>
        <div className="mt-12">
          <ProductList/>
        </div>
      </div>
    </div>
  )
}

export default Home