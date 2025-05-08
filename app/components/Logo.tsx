import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      alt="logo"
      src={"/logo.png"}
      width={1000}
      height={1000}
      className=" w-50 h-10 md:w-36 lg:w-70 lg:h-16"
    ></Image>
  );
}
