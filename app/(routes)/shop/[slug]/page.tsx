import React from 'react'

// Statik olarak oluşturulacak sayfalar için parametre üretimi
export async function generateStaticParams() {
  // Burada veritabanından veya API'den slug listesi alabilirsiniz
  // Örnek olarak sabit bir liste kullanıyorum
  return [
    { slug: 'urun-1' },
    { slug: 'urun-2' },
    { slug: 'urun-3' },
  ]
}

// Server component olarak sayfa
export default function ShopDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      {params.slug}
    </div>
  )
}