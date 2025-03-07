import { categories } from '@/constans'
import { Instagram, TwitterIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  // Ürünlerimizi ikiye bölmek için yarısını alıyoruz
  const half = Math.ceil(categories.length / 2);
  const firstHalf = categories.slice(0, half);
  const secondHalf = categories.slice(half);

  return (
    <footer className="text-white py-6 dark:bg-gray-900 ">
      <div className="container mx-auto px-6">
        {/* Üst Bölüm */}
        <div className="flex justify-center items-center bg-[#2D1E5F] py-4 space-x-4 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-white dark:text-gray-200">FİYAT TEKLİFİ ALIN</h2>
          <p className="text-sm text-white dark:text-gray-400">Ürünlerimiz hakkında bilgi ve fiyat teklifi almak için bizimle iletişime geçin.</p>
          <Link href={'/contact'}>
            <button className="bg-white text-[#2D1E5F] font-bold py-2 px-6 rounded-md shadow-md hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              FİYAT TEKLİFİ ALIN
            </button>
          </Link>
        </div>

        {/* Alt Bölüm */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-mycolor23 dark:text-gray-400">
          {/* Ürünlerimiz Sol */}
          <div className='flex flex-col space-y-2'>
            <h2 className='font-bold text-mycolor27 dark:text-gray-200'>Ürünlerimiz</h2>
            {firstHalf.map((component) => (
              <Link
                key={component.title}
                href={component.href}
              >
                {component.title}
              </Link>
            ))}
          </div>

          {/* Ürünlerimiz Sağ */}
          <div className='flex flex-col space-y-2'>
            <h2 className='font-bold text-mycolor27 dark:text-gray-200'>Ürünlerimiz</h2>
            {secondHalf.map((component) => (
              <Link
                key={component.title}
                href={component.href}
              >
                {component.title}
              </Link>
            ))}
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-bold text-mycolor27 dark:text-gray-200">İLETİŞİM</h3>
            <p className="text-sm text-mycolor27 dark:text-gray-400">
              <strong>METAL RULMAN HIRDAVAT SAN. VE TİC. LTD. ŞTİ.</strong>
            </p>
            <p className="text-sm text-mycolor27 dark:text-gray-400">
              Başakşehir Metal İş Sanayi Sitesi Yolu, D:4<br />
              Blok No.40 İkitelli Organize Sanayi Sitesi<br />
              Başakşehir/İstanbul
            </p>  
            <p className="text-sm mt-2 text-mycolor27 dark:text-gray-400">
              <strong>E-Mail:</strong> info@metalrulman.com
            </p>
            <p className="text-sm text-mycolor27 dark:text-gray-400">
              <strong>Telefon:</strong> 0 (212) 671 73 36
            </p>

            {/* Sosyal Medya */}
            <div className="mt-4 flex space-x-2">
              <Link href='https://x.com/home' target='_blank' ><TwitterIcon className=" text-mycolor27 dark:text-gray-400" /></Link>
              <Link href='https://www.instagram.com/metal_rulman_hirdavat/' target='_blank' ><Instagram className=" text-mycolor27 dark:text-gray-400" /></Link>
            </div>
          </div>
        </div>

        {/* Alt Çizgi ve Copyright */}
        <div className="mt-6 border-t border-gray-600 pt-4 text-center text-sm text-gray-300 dark:border-gray-700 dark:text-gray-500">
          <p>2025 © Tüm hakları saklıdır.</p>
          <p className="text-gray-400">CodeWithMoto | Software</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer