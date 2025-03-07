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

export interface ProductType{
  id: number;
  title: string;
  description: string;
  image: string;
};

export const products: ProductType[] = [
  {
    id: 1,
    title: '1100-XL-KRR-B-2C-L285/70-OSE',

    description: 'Radial insert ball bearing',
    image: '/products/rulman1.png',
  },
  {
    id: 2,
    title: '11204-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman2.png',
  },
  {
    id: 3,
    title: '11205-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman3.png',
  },
  {
    id: 4,
    title: '11206-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman4.png',
  },
  {
    id: 5,
    title: '11207-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman5.png',
  },
  {
    id: 6,
    title: '11208-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman6.png',
  },
  {
    id: 7,
    title: '11209-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman7.png',
  },
  {
    id: 8,
    title: '11210-TVH',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman8.png',
  },
  {
    id: 9,
    title: 'Product Nine',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman9.png',
  },
  {
    id: 10,
    title: 'Product Ten',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman10.png',
  },
  {
    id: 11,
    title: 'Product Eleven',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman11.png',
  },
  {
    id: 12,
    title: 'Product Twelve',
    description: 'Self-aligning ball bearing 112..-TVH, plastic cage',
    image: '/products/rulman12.png',
  },
];