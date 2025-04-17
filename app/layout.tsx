import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import DemoBanner from './components/DemoBanner'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Rulman Merkezi | Endüstriyel Ürünler Demo',
  description: 'Endüstriyel rulmanlar, kaplinler, bağlantı elemanları ve daha fazlası. Modern e-ticaret deneyimi ile kaliteli ürünlere ulaşın.',
  keywords: 'rulman, rulman çeşitleri, endüstriyel malzeme, kaplin, bağlantı elemanları, e-ticaret, demo',
  authors: [{ name: 'Rulman Merkezi Demo' }],
  creator: 'Rulman Merkezi Demo Ekibi',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    title: 'Rulman Merkezi | Endüstriyel Ürünler Demo',
    description: 'Modern Next.js e-ticaret deneyimi ile kaliteli endüstriyel ürünlere ulaşın.',
    siteName: 'Rulman Merkezi Demo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <FavoritesProvider>
              <Toaster position="top-center" />
              <DemoBanner />
              {children}
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
