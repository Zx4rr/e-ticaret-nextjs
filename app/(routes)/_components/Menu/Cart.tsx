import React from "react";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
const CartMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingBag/>
      </SheetTrigger>
      <SheetContent className=" ">
        <div className="flex flex-col mt-4 space-y-6">
            Empty Cart
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartMenu