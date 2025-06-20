import brands from "@/data/brands";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContactDiv from "./ContactDiv";

export default function BrandsBanner() {
  return (
    <div className="mt-10 px-6 lg:px-8 p-10 flex flex-col lg:flex-row w-3/4 m-auto">
      <ContactDiv />
      <div className="mx-auto max-w-2xl lg:max-w-7xl my-5">
        <div className="flex justify-between max-sm:mx-auto max-sm:max-w-md flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4 w-full lg:gap-10">
          {brands.map((brand, index) => (
            <Image
              src={brand.image}
              alt={brand.name}
              width={1000}
              height={1000}
              key={index}
              className="object-contain w-40"
            />
          ))}
        </div>
        <Link
          href={"/collab"}
          className=" mt-10 border-2 font-bold text-orange-400 border-orange-400 p-3 w-fit m-auto flex justify-center"
        >
          Hazte colaborador
        </Link>
      </div>
    </div>
  );
}
