import { ProductType } from "@/constans";
import React from "react";
import Image from 'next/image'
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
interface ProductItemProps {
  product: ProductType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
            <Image
                alt='{product.title}'
                className="w-full object-cover mb-4 rounded-xl"
                width={300}
                height={300}
                src={product.image}
            />
      </CardContent>
      <CardFooter>
    <div className="flex flex-col space-y-2 w-full">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105">Ürünü İncele</Button>
        <ProductModal />
    </div>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
