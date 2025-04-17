'use client'

import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'
import { LogOut, User2, ChevronDown, LogIn, UserPlus, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth()
  const [isHovered, setIsHovered] = useState(false)

  // Kullanıcının baş harflerini oluşturma
  const getInitials = () => {
    if (!user || !user.name) return 'U';
    
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    toast.success('Başarıyla çıkış yaptınız');
  };

  return (
    <Menu as="div" className="relative ml-3">
      {({ open }) => (
        <>
          <div>
            {isAuthenticated ? (
              <Menu.Button 
                className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-sm text-white hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg px-3 py-1.5"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Kullanıcı menüsünü aç</span>
                <div className="relative h-7 w-7 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm overflow-hidden">
                  {getInitials()}
                  {isHovered && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.3 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="absolute inset-0 bg-white rounded-full"
                    />
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-medium">{user?.name?.split(' ')[0] || 'Kullanıcı'}</span>
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Menu.Button>
            ) : (
              <div className="flex space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="text-sm font-medium flex items-center gap-1.5 px-3 py-2 text-slate-700 dark:text-slate-200 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Giriş</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="text-sm font-medium flex items-center gap-1.5 px-3 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-md shadow-md hover:shadow-lg transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Kayıt Ol</span>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-40 mt-2 w-60 origin-top-right rounded-xl bg-white dark:bg-gray-800 py-2 shadow-xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none border border-gray-100 dark:border-gray-700">
              {isAuthenticated && (
                <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    {user?.name || 'Kullanıcı'}
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="truncate text-xs text-gray-500 dark:text-gray-400"
                  >
                    {user?.email || 'kullanici@example.com'}
                  </motion.p>
                </div>
              )}
              
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link
                    href="/profile"
                    className={`${
                      active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                    } flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left transition-colors`}
                  >
                    <User2 className={`w-4 h-4 ${active ? 'text-blue-500' : ''} transition-colors`} />
                    <span>Profilim</span>
                  </Link>
                )}
              </Menu.Item>
              
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link
                    href="/fav"
                    className={`${
                      active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                    } flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left transition-colors`}
                  >
                    <Heart className={`w-4 h-4 ${active ? 'text-blue-500' : ''} transition-colors`} />
                    <span>Favorilerim</span>
                  </Link>
                )}
              </Menu.Item>
              
              <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>
              
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'
                    } flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left transition-colors`}
                  >
                    <LogOut className={`w-4 h-4 ${active ? 'text-red-500' : ''} transition-colors`} />
                    <span>Çıkış Yap</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
} 