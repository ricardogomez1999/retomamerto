import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex justify-center md:justify-start">
          <Logo />
        </div>
        <div className="flex justify-center">
          <NavBar vertical />
        </div>
        <div className="flex flex-col items-center md:items-end justify-center gap-1">
          <p className="font-light">Contacto</p>
          <p>Teléfono: +1 234 567 8901</p>
          <Link href="mailto:retomamerto@example.com" className="text-orange-500">
            retomamerto@example.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
