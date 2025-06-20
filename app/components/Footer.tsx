import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Link from "next/link";
import BrandsBanner from "./BrandsBanner";

export default function Footer() {
  return (
    <footer className=" bg-black text-white py-10">
      <BrandsBanner />
      <hr className=" text-orange-400 border-2 w-3/4 m-auto" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="flex justify-center lg:justify-start">
          <Logo />
        </div>
        <div className="flex justify-center">
          <NavBar vertical />
        </div>
        <div className="flex flex-col items-center lg:items-end justify-center gap-1">
          <p className="font-light">Contacto</p>
          <p>Teléfono: +52 844 350 6065</p>
          <Link href="mailto:info@retomamerto.com" className="text-orange-500">
            info@retomamerto.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
