import React from 'react'
import { FavoritesProvider } from '../context/FavoritesContext'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#1a1f2b] p-4'>
      <div className='w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl backdrop-blur-md shadow-2xl rounded-3xl p-8'>
        <FavoritesProvider> 
          {children}
        </FavoritesProvider>
      </div>
    </div>
  )
}

export default AuthLayout