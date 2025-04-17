import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductType } from "@/constans";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useFavorites } from "@/app/context/FavoritesContext";

interface ProductModalProps {
  product: ProductType;
}

const ProductModal = ({ product }: ProductModalProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          Ürünü İncele
        </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <motion.div 
              className="flex justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                alt={product.title}
                className="w-full h-auto object-cover rounded-xl shadow-lg"
                width={300}
                height={300}
                src={product.image}
              />
            </motion.div>
            <motion.div 
              className="flex flex-col justify-center p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-4xl mb-4 font-bold text-gray-800 dark:text-white">
                {product.title}
              </h2>
              <p className="text-lg md:text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-6">
                {product.description}
              </p>
              <DialogFooter className="mt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => {
                      if (isFavorite(product.id.toString())) {
                        removeFavorite(product.id.toString());
                        toast.success("Ürün favorilerden kaldırıldı");
                      } else {
                        addFavorite({ ...product, id: product.id.toString() });
                        toast("Ürün Favorilere Eklendi", {
                          description: "İncelediğiniz ürün favorilere eklendi",
                          action: {
                            label: "Geri Al",
                            onClick: () => {
                              removeFavorite(product.id.toString());
                              toast.success("Ürün favorilerden kaldırıldı");
                            },
                          },
                        });
                      }
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isFavorite(product.id.toString()) ? "Favorilerden Kaldır" : "Favorilere Ekle"}
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
