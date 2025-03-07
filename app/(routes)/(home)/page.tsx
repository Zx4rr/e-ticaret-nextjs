import React from 'react'
import Hero from '../_components/Hero'
import SliderPage from '../_components/sliders'
import CenterProductPage from '../_components/CenterProduct'
import ProductList from '../_components/Product/ProductList'

const Home = () => {
  return (
    <div>
      <SliderPage/>
      <CenterProductPage/>
      <Hero/>
      <ProductList/>
    </div>
  )
}

export default Home