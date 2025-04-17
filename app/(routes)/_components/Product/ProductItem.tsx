"use client";
import { ProductType } from "@/constans";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductModal from "./ProductModal";
import { toast } from "sonner";
import { useFavorites } from "@/app/context/FavoritesContext";
import { motion } from "framer-motion";
import { StarRating } from "@/components/ui/star-rating";

interface ProductItemProps {
  product: ProductType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = () => {
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardHeader className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
              {product.title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 mb-2">
              {product.description}
            </CardDescription>
            <div className="flex items-center">
              <StarRating 
                value={product.rating || 0} 
                readOnly 
                size="sm" 
              />
              {product.reviewCount !== undefined && (
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  ({product.reviewCount})
                </span>
              )}
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="p-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-lg"
          >
          <Image
            alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            width={300}
            height={300}
            src={product.image}
          />
          </motion.div>
        </CardContent>
        <CardFooter className="p-4">
          <div className="flex flex-col space-y-3 w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
            <Button
              onClick={handleFavoriteClick}
              className={`w-full ${ 
                isFavorite(product.id.toString())
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                } text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {isFavorite(product.id.toString())
                ? "Favorilerden Kaldır"
                : "Favorilere Ekle"}
            </Button>
            </motion.div>
            <ProductModal product={product} />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductItem;
