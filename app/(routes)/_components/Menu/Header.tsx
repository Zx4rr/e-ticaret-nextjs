import { ModeToggle } from "@/components/ModeToggle";
import { Input } from "@/components/ui/input";
import { Heart, Search, UserIcon } from "lucide-react";
import { Anton } from "next/font/google";
import React from "react";
import NavMenu from "./NavMenu";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import CartMenu from "./Cart";
import Link from "next/link";
import Image from 'next/image'
const anton = Anton({
  subsets: ["latin"], // Latin karakter setini ekler
  weight: "400", // Anton'un sadece 400 ağırlığı var
  display: "swap", // CLS (Cumulative Layout Shift) hatalarını önler
});
const Header = () => {
  return (
    <div className="mx-auto bg-white dark:bg-mycolor1 shadow-md">
      <div className="container flex flex-row items-center justify-between p-5">
        <div>
          <h2 className={`${anton.className} text-2xl`}>
           <Image
                  alt="logo"
                  src={'/IconImage/metalrulmanlogo.png'}
                  width={1080}
                  height={1920}
                  className="w-24 h-auto md:w-48 md:h-auto lg:w-64 lg:h-auto"
           
                  />
          </h2>
        </div>
        <div className="hidden md:flex relative md:min-w-96 lg:w-1/2">
          <Input className="w-full border-2" />
          <Button variant="link" className="absolute right-1">
            <Search/>
          </Button>
        </div>
        <div className="flex flex-row items-center space-x-4">
            <ModeToggle/>
            <Link href="/fav">
            <Heart/>
            </Link>

            <CartMenu/>

            <Link href="/login">
            <UserIcon/>
            </Link>
            
            <MobileMenu/>
        </div>
      </div>
      <NavMenu/>
    </div>
  );
};

export default Header;
