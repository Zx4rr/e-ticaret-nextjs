"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"
import Image from "next/image"
import { Building2, Target, ArrowUpRight, History, Users2 } from "lucide-react"

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const hoverVariants = {
    initial: { 
      scale: 1,
      background: "linear-gradient(to right, transparent, transparent)",
      borderColor: "rgb(229, 231, 235)",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
    },
    hover: { 
      scale: 1.01,
      background: "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1))",
      borderColor: "rgb(59, 130, 246)",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  const textRevealVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white relative inline-block"
            >
              <span className="relative z-10">KURUMSAL</span>
              <motion.span 
                className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/50 dark:bg-blue-900/30 -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Askaya Hırdavat Yapı olarak 20 yıldır sektörde kalite ve güvenin simgesi olmaya devam ediyoruz.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Accordion type="single" collapsible className="w-full space-y-6">
              <motion.div variants={itemVariants}>
                <AccordionItem 
                  value="item-1" 
                  className="border-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    variants={hoverVariants}
                    initial="initial"
                    whileHover="hover"
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <AccordionTrigger className="px-8 py-6 text-lg font-semibold hover:no-underline text-gray-800 dark:text-white">
                      <span className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                          <Building2 size={18} />
                        </span>
                        <span>Askaya Hırdavat Yapı</span>
                      </span>
                    </AccordionTrigger>
                  </motion.div>
                  <AccordionContent className="px-8 pb-8 pt-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative md:w-1/3 h-48 rounded-xl overflow-hidden shadow-md">
                        <Image 
                          src="/IconImage/about-company.jpg" 
                          alt="Metal Rulman" 
                          fill 
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/public/IconImage/askayafirma.png";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 text-white text-sm font-medium">
                          <span className="flex items-center gap-1">
                            20 yıllık tecrübe
                            <History size={14} className="ml-1" />
                          </span>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <motion.div 
                          className="prose prose-blue dark:prose-invert max-w-none"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <motion.p 
                            custom={0}
                            variants={textRevealVariants}
                            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            <span className="font-medium text-blue-600 dark:text-blue-400">20 Yıldır</span> aktif olan şirketimiz Askaya Yapı Hırdavat sektörüne emin adımlarla İkitelli 
                            organize sanayi bölgesinde devam etmektedir.
                          </motion.p>
                          <motion.p 
                            custom={1}
                            variants={textRevealVariants}
                            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            Firmamız <span className="italic">Rulman, Hırdavat Ve Nalburiye</span> ürünlerinin 
                            en kalitelilerini piyasaya sürdürmekte, her geçen gün çeşitlerini arttırarak ve müşteri taleplerini 
                            yerine getirerek <span className="underline decoration-blue-400 decoration-wavy decoration-2 underline-offset-4">en iyi hizmet kalitesini</span> örnek almaktadır.
                          </motion.p>
                          <motion.p 
                            custom={2}
                            variants={textRevealVariants}
                            className="mb-0 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            Bizleri, ürünlerimizi ve mesleki kalitemizi yakından görmek isterseniz Metal Rulman ailesi olarak firmamıza bekleriz.
                          </motion.p>
                        </motion.div>
                        <motion.div 
                          className="mt-4 inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm cursor-pointer group"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          İletişime geçin
                          <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                        </motion.div>
                      </div>
                    </div>
                  </AccordionContent>
          </AccordionItem>
              </motion.div>

              <motion.div variants={itemVariants}>
                <AccordionItem 
                  value="item-2" 
                  className="border-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    variants={hoverVariants}
                    initial="initial"
                    whileHover="hover"
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <AccordionTrigger className="px-8 py-6 text-lg font-semibold hover:no-underline text-gray-800 dark:text-white">
                      <span className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300">
                          <Target size={18} />
                        </span>
                        <span>Misyonumuz</span>
                      </span>
                    </AccordionTrigger>
                  </motion.div>
                  <AccordionContent className="px-8 pb-8 pt-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-full">
                        <div className="p-5 border-l-4 border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-r-lg">
                          <motion.div 
                            className="prose prose-emerald dark:prose-invert max-w-none"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                          >
                            <motion.p 
                              custom={0}
                              variants={textRevealVariants}
                              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                            >
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Rulman, Hırdavat, Cıvata, Nalburiye</span> sektöründe deneyimi yüksek başarının 
                              bilincinde, müşteri memnuniyetini ön planda tutan anlayışımız ile sizler için var olan bir firmayız.
                            </motion.p>
                          </motion.div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <motion.div 
                            custom={1}
                            variants={textRevealVariants}
                            className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600"
                          >
                            <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Kalite</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">En yüksek standartlarda ürünler sunmak</div>
                          </motion.div>
                          
                          <motion.div 
                            custom={2}
                            variants={textRevealVariants}
                            className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600"
                          >
                            <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Güven</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Müşterilerimize güvenilir hizmet vermek</div>
                          </motion.div>
                          
                          <motion.div 
                            custom={3}
                            variants={textRevealVariants}
                            className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600"
                          >
                            <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Çözüm</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Müşteri ihtiyaçlarına özel çözümler sağlamak</div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
          </AccordionItem>
              </motion.div>

              <motion.div variants={itemVariants}>
                <AccordionItem 
                  value="item-3" 
                  className="border-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    variants={hoverVariants}
                    initial="initial"
                    whileHover="hover"
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <AccordionTrigger className="px-8 py-6 text-lg font-semibold hover:no-underline text-gray-800 dark:text-white">
                      <span className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300">
                          <Users2 size={18} />
                        </span>
                        <span>Vizyonumuz</span>
                      </span>
                    </AccordionTrigger>
                  </motion.div>
                  <AccordionContent className="px-8 pb-8 pt-4">
                    <div className="relative">
                      <div className="absolute -left-4 top-0 bottom-0 border-l-2 border-dashed border-purple-300 dark:border-purple-700"></div>
                      <motion.div 
                        className="prose prose-purple dark:prose-invert max-w-none"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          custom={0}
                          variants={textRevealVariants}
                          className="relative pl-8 mb-6"
                        >
                          <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                          <h3 className="text-lg font-medium text-purple-600 dark:text-purple-400 m-0">Sektörde Liderlik</h3>
                          <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                            Kalite, dinamiğimizi ve yenilikçilikle bilinirliğimizi üst düzeye taşıyarak, sektörümüzde 
                            güvenilir bir çözüm ortağı olmak.
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          custom={1}
                          variants={textRevealVariants}
                          className="relative pl-8 mb-6"
                        >
                          <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                          <h3 className="text-lg font-medium text-purple-600 dark:text-purple-400 m-0">Müşteri Memnuniyeti</h3>
                          <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                            Sağladığımız hizmet ile müşterilerimiz için vazgeçilmez bir firma olmak ve her zaman 
                            memnuniyeti en üst seviyede tutmak.
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          custom={2}
                          variants={textRevealVariants}
                          className="relative pl-8"
                        >
                          <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                          <h3 className="text-lg font-medium text-purple-600 dark:text-purple-400 m-0">Sürekli Gelişim</h3>
                          <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                            Teknolojik gelişmeleri takip ederek, ürün yelpazemizi sürekli genişletmek ve
                            hizmet kalitemizi her geçen gün daha da artırmak.
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </AccordionContent>
          </AccordionItem>
              </motion.div>
        </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;