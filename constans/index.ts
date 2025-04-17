export const categories: { title: string; href: string; description: string }[] = [
  {
    title: "Rulman Çeşitleri",
    href: "/shop/rulman-cesitleri",
    description: "Farklı tipte rulman çeşitleri ve kullanım alanları hakkında bilgiler.",
  },
  {
    title: "Kayış Kasnak",
    href: "/shop/kayis-kasnak",
    description: "Makinalarda güç aktarımı için kullanılan kayış ve kasnak çeşitleri.",
  },
  {
    title: "Zincir – Dişli – Kaplin",
    href: "/shop/zincir-disli-kaplin",
    description: "Endüstriyel zincir, dişli ve kaplin çeşitleri ile detaylar.",
  },
  {
    title: "Aşındırıcılar – Zımparalar",
    href: "/shop/asindiricilar-zimparalar",
    description: "Metal ve ahşap işleme için aşındırıcılar ve zımparalar.",
  },
  {
    title: "Bağlantı Elemanları",
    href: "/shop/baglanti-elemanlari",
    description: "Cıvata, somun, vida gibi bağlantı elemanları ve kullanım alanları.",
  },
  {
    title: "El Aletleri",
    href: "/shop/el-aletleri",
    description: "Manuel el aletleri ile tamirat ve bakım işleri için çözümler.",
  },
  {
    title: "Elektrikli El Aletleri",
    href: "/shop/elektrikli-el-aletleri",
    description: "Profesyonel ve amatör kullanım için elektrikli el aletleri.",
  },
  {
    title: "Halat ve İp Çeşitleri",
    href: "/shop/halat-ip-cesitleri",
    description: "Farklı sektörler için uygun halat ve ip çeşitleri.",
  },
  {
    title: "Havalı El Aletleri",
    href: "/shop/havali-el-aletleri",
    description: "Basınçlı hava ile çalışan havalı el aletleri ve özellikleri.",
  },
  {
    title: "Hidrolik & Pnömatik",
    href: "/shop/hidrolik-pnomatik",
    description: "Hidrolik ve pnömatik sistemler için çeşitli ekipmanlar.",
  },
  {
    title: "Kalıp Elemanları",
    href: "/shop/kalip-elemanlari",
    description: "Kalıp üretiminde kullanılan elemanlar ve teknik detaylar.",
  },
  {
    title: "Kaynak Ekipmanları",
    href: "/shop/kaynak-ekipmanlari",
    description: "Endüstriyel ve hobi amaçlı kaynak makineleri ve aksesuarları.",
  },
  {
    title: "Kesici Takımlar",
    href: "/shop/kesici-takimlar",
    description: "Metal, ahşap ve plastik kesimi için kesici takımlar.",
  },
  {
    title: "Makina Çeşitleri",
    href: "/shop/makina-cesitleri",
    description: "Farklı sektörlere yönelik makine çeşitleri ve açıklamaları.",
  },
  {
    title: "Mobilya Tekerlekleri",
    href: "/shop/mobilya-tekerlekleri",
    description: "Mobilya ve sanayi için tekerlek çeşitleri ve kullanım alanları.",
  },
  {
    title: "Redüktörler – Kompresörler",
    href: "/shop/reduktorler-kompresorler",
    description: "Redüktör ve kompresör sistemleri hakkında detaylı bilgiler.",
  },
  {
    title: "Tesisat Malzemeleri",
    href: "/shop/tesisat-malzemeleri",
    description: "Su, gaz ve elektrik tesisatında kullanılan malzemeler.",
  },
  {
    title: "Vanalar – Renkorlar",
    href: "/shop/vanalar-rekorlar",
    description: "Sıvı ve gaz kontrolü için vana ve rekor çeşitleri.",
  }
];

export interface CarouselType{
  id:number;
  image:string;
}

export const CarouselList: CarouselType[] = [
  {
    id: 1,
    image: "/slider/best.png"
  },
  {
    id: 2,
    image: "/slider/emes.png"
  },
  {
    id: 3,
    image: "/slider/fag.png"
  },
  {
    id: 4,
    image: "/slider/iscar.png"
  },
  {
    id: 5,
    image: "/slider/karbosan.png"
  },
  {
    id: 6,
    image: "/slider/korloy.png"
  },
  {
    id: 7,
    image: "/slider/loctite.png"
  },
  {
    id: 8,
    image: "/slider/skf.png"
  }, 
  {
    id: 9,
    image: "/slider/nsk.png"
  },
  {
    id: 10,
    image: "/slider/oerlikon.png"
  },
  {
    id: 11,
    image: "/slider/osaka.png"
  },
  {
    id: 12,
    image: "/slider/petrolofisi.png"
  },
  {
    id: 13,
    image: "/slider/pmi.png"
  }, 
  {
    id: 14,
    image: "/slider/polisan.png"
  },
  {
    id: 15,
    image: "/slider/shell.png"
  },
]

// Genel ürün tipi tanımı
export interface ProductType {
  id: number;
  title: string;
  description: string;
  image: string;
  rating?: number;
  reviewCount?: number;
}

// Rulman ürünleri
export const rulmanProducts: ProductType[] = [
  {
    id: 1,
    title: '1100-XL-KRR-B-2C-L285/70-OSE',
    description: 'Radial insert ball bearing',
    image: '/products/rulman1.png',
    rating: 4.5,
    reviewCount: 12
  },
  {
    id: 2,
    title: '11204-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman2.png',
    rating: 3.8,
    reviewCount: 8
  },
  {
    id: 3,
    title: '11205-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman3.png',
    rating: 4.2,
    reviewCount: 15
  },
  {
    id: 4,
    title: '11206-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman4.png',
    rating: 5.0,
    reviewCount: 7
  },
  {
    id: 5,
    title: '11207-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman5.png',
    rating: 4.7,
    reviewCount: 22
  },
  {
    id: 6,
    title: '11208-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman6.png',
    rating: 3.5,
    reviewCount: 11
  },
  {
    id: 7,
    title: '11209-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman7.png',
    rating: 4.1,
    reviewCount: 9
  },
  {
    id: 8,
    title: '11210-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman8.png',
    rating: 4.3,
    reviewCount: 16
  },
  {
    id: 9,
    title: 'Product Nine',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman9.png',
    rating: 3.9,
    reviewCount: 14
  },
  {
    id: 10,
    title: 'Product Ten',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman10.png',
    rating: 4.6,
    reviewCount: 13
  },
  {
    id: 11,
    title: 'Product Eleven',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman11.png',
    rating: 3.2,
    reviewCount: 6
  },
  {
    id: 12,
    title: 'Product Twelve',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman12.png',
    rating: 4.8,
    reviewCount: 19
  }
];

// Zincir-Dişli Ürünleri
export const zincirDisliProducts: ProductType[] = [
  {
    id: 101,
    title: '5M * 15 TRİGER KASNAK – METRİK HATVELİ HTD',
    description: 'Ağır hizmet tipi endüstriyel zincir dişli sistemi, yüksek dayanıklılık ve verimli güç aktarımı.',
    image: '/products/zincirdisli1.jpg',
  },
  {
    id: 102,
    title: '8M * 30 TRİGER KASNAK – METRİK HATVELİ HTD',
    description: 'Özel ısıl işlem görmüş çelik malzemeden üretilmiş, aşınma direnci yüksek zincir dişli.',
    image: '/products/zincirdisli2.jpg',
  },
  {
    id: 103,
    title: 'Paslanmaz Zincir Dişli Z-305',
    description: 'Gıda ve kimya endüstrisi için paslanmaz çelikten üretilmiş zincir dişli sistemi.',
    image: '/products/zincirdisli3.jpg',
  },
  {
    id: 104,
    title: 'Konveyör Zincir Dişli Seti',
    description: 'Konveyör sistemlerinde kullanım için özel tasarlanmış yüksek performanslı zincir dişli seti.',
    image: '/products/zincirdisli4.jpg',
  },
  {
    id: 105,
    title: 'Çift Sıralı Zincir Dişli',
    description: 'Çift sıralı zincirler için tasarlanmış, ağır yük taşıma kapasitesine sahip endüstriyel dişli.',
    image: '/products/zincirdisli5.jpg',
  },
  {
    id: 106,
    title: 'Hassas Zincir Dişli Mekanizması',
    description: 'Hassas mühendislik gerektiren uygulamalar için özel üretim zincir dişli mekanizması.',
    image: '/products/zincirdisli6.jpg',
  },
  {
    id: 107,
    title: 'Otomotiv Zincir Dişli Sistemi',
    description: 'Otomotiv endüstrisi için yüksek dayanıklılık ve performans sunan zincir dişli sistemi.',
    image: '/products/zincirdisli7.jpg',
  },
  {
    id: 108,
    title: 'Endüstriyel Transmisyon Zinciri',
    description: 'Fabrika ve üretim hatları için tasarlanmış uzun ömürlü transmisyon zinciri.',
    image: '/products/zincirdisli8.jpg',
  },
  {
    id: 109,
    title: 'Ağır Hizmet Zincir Dişli Z-500',
    description: 'Madencilik ve inşaat ekipmanlarında kullanım için geliştirilmiş ultra dayanıklı zincir dişli.',
    image: '/products/zincirdisli9.jpg',
  },
  {
    id: 110,
    title: 'Kompakt Zincir Dişli Sistemi',
    description: 'Sınırlı alanlarda maksimum performans için tasarlanmış kompakt zincir dişli çözümü.',
    image: '/products/zincirdisli10.jpg',
  }
];

// Kaplin Ürünleri
export const kaplinProducts: ProductType[] = [
  {
    id: 201,
    title: 'Esnek Kaplin K-100',
    description: 'Titreşim sönümleme özelliğine sahip esnek kaplin, hassas hizalama gerektirmeyen ekipmanlar için ideal.',
    image: '/products/kaplin.jpg',
  },
  {
    id: 202,
    title: 'Endüstriyel Disk Kaplin',
    description: 'Yüksek tork iletimi sağlayan, bakım gerektirmeyen disk kaplin sistemi.',
    image: '/products/kaplin2.jpg',
  },
  {
    id: 203,
    title: 'Dişli Kaplin Mekanizması',
    description: 'Ağır hizmet uygulamaları için dişli kaplin, yüksek tork ve geniş çalışma sıcaklık aralığı sunar.',
    image: '/products/kaplin3.jpg',
  },
  {
    id: 204,
    title: 'Zincir Kaplin Sistemi',
    description: 'Endüstriyel güç aktarımında kullanılan, kolay montaj ve demontaj özelliğine sahip zincir kaplin.',
    image: '/products/kaplin4.jpg',
  },
  {
    id: 205,
    title: 'Hidrolik Kaplin H-500',
    description: 'Hidrolik sistemlerde kullanım için özel tasarlanmış, basınca dayanıklı kaplin çözümü.',
    image: '/products/kaplin5.jpg',
  }
];
export const baglantiElemanlari: ProductType[] = [
  {
    id: 201,
    title: 'Akb Civatalar',
    description: 'Titreşim sönümleme özelliğine sahip esnek kaplin, hassas hizalama gerektirmeyen ekipmanlar için ideal.',
    image: '/products/anahtarbasli.jpg',
  },
  {
    id: 202,
    title: 'İmbus Civata',
    description: 'Yüksek tork iletimi sağlayan, bakım gerektirmeyen disk kaplin sistemi.',
    image: '/products/anahtar-basli.jpg',
  }
];

// Zincir-Dişli-Kaplin kategorisi için birleştirilmiş ürünler
export const zincirDisliKaplinProducts: ProductType[] = [
  ...zincirDisliProducts,
  ...kaplinProducts
];

// Eski genel ürün listesi (geriye dönük uyumluluk için)
export const products: ProductType[] = [
  ...rulmanProducts,
  ...zincirDisliKaplinProducts
];