'use client'
import React from 'react'
import Image from 'next/image'
import CountUp from 'react-countup'
import { useRouter } from "next/navigation";

const CenterProductPage = () => {
  const router = useRouter();

  const handleProductClick = (title: string) => {
    if (title === "RULMAN ÇEŞİTLERİ") {
      router.push('/shop/rulman-cesitleri');
    }else if (title === "HİDROLİK & PNÖMATİK") {
      router.push('/shop/hidrolik-pnomatik');
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* Ürün Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleProductClick(product.title)}
          >
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={300}
              className="w-full h-auto"
            />
            <div className="bg-purple-900 text-white text-center py-3 font-bold text-lg">
              {product.title}
            </div>
          </div>
        ))}
      </div>

      {/* Hakkımızda ve İstatistikler */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-center">
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold">
            METAL RULMAN HIRDAVAT SAN. VE TİC. LTD. ŞTİ.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-3">
            2000 yılında İstanbul İkitelli’de kurulan firmamız, kurulduğu günden beri emin
            adımlarla sektörün liderliğine ulaşmayı hedeflemektedir. Bu amacımıza ulaşmak ve
            alışılmış sektör dinamiklerinden ayrılmak için kendimize belirlediğimiz ilkelerimiz
            bulunmaktadır.
          </p>
        </div>

        {/* İstatistikler */}
        <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-12 md:mt-0">
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-3xl font-bold text-purple-900">
                <CountUp end={parseInt(stat.value.replace(/\D/g, ''))} duration={2} suffix={stat.value.replace(/\d/g, '')} />
              </h3>
              <p className="text-gray-600 font-semibold mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const products = [
  {
    title: "RULMAN ÇEŞİTLERİ",
    image: "/slider/rulman.png", // Resminizi buraya ekleyin
  },
  {
    title: "HİDROLİK & PNÖMATİK",
    image: "/slider/pnomatik.png",
  },
  {
    title: "HIRDAVAT",
    image: "/slider/hirdavat.png",
  },
]

const stats = [
  { value: "100%", label: "Müşteri Memnuniyeti" },
  { value: "600+", label: "Aktif Müşteri" },
  { value: "1.000+", label: "Ürün Çeşidi" },
]

export default CenterProductPage