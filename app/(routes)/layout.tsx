'use client'
import React from 'react'
import Header from './_components/Menu/Header'
import Footer from './_components/Footer'
import { FavoritesProvider } from '../context/FavoritesContext'
// import { FavoritesProvider } from '@/context/FavoritesContext'

interface RoutesLayoutProps {
  children: React.ReactNode
}

const RoutesLayout = ({ children }: RoutesLayoutProps) => {
  return (
    <FavoritesProvider>
      <Header />
      {children}
      <Footer />
    </FavoritesProvider>
  )
}

export default RoutesLayout