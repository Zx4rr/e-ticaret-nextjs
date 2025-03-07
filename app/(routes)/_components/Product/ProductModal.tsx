import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProductModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
          Favorilere Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="">
              <Image
                alt="{product.title}"
                className="w-full object-cover mb-4 rounded-xl"
                width={300}
                height={300}
                src={product.image}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
