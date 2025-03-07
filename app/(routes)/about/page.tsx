import React from 'react'

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 p-10">
      <div>
        <h2 className="text-2xl font-bold text-mycolor27">Metal Rulman</h2>
        <p className="mt-4 text-mycolor27 max-w-3xl">
          20 Yıldır aktif olan şirketimiz Metal Rulman, Hırdavat sektörüne emin adımlarla 
          İkitelli organize sanayi bölgesinde devam etmektedir. Firmamız Rulman, Hırdavat 
          ve Nalburiye ürünlerinin en kalitelilerini piyasaya sürmekte, her geçen gün 
          çeşitlerini arttırarak ve müşteri taleplerini yerine getirerek en iyi hizmet 
          kalitesini örnek almaktadır. Bizleri, ürünlerimizi ve mesleki kalitemizi 
          yakından görmek isterseniz Metal Rulman ailesi olarak firmamıza bekleriz.
        </p>
      </div>  

      <div>
        <h2 className="text-2xl font-bold text-mycolor27">Misyonumuz</h2>
        <p className="mt-4 text-mycolor27 max-w-3xl">
          Rulman, Hırdavat, Civata, Nalburiye sektöründe deneyimi yüksek başarının 
          bilincinde, müşteri memnuniyetini ön planda tutan anlayışımız ile sizler için 
          var olan bir firmayız.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-mycolor27">Vizyonumuz</h2>
        <p className="mt-4 text-mycolor27 max-w-3xl">
          Kalite, dinamiğimizi ve yenilikçilikle bilinirliğimizi üst düzeye taşıyarak, 
          sektörümüzde güvenilir bir çözüm ortağı ve sağladığımız hizmet ile müşterilerimiz 
          için vazgeçilmez bir firma olmak.
        </p>
      </div>
    </div>
  )
}

export default AboutPage