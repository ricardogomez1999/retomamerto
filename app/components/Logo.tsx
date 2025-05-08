import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      alt="logo"
      src={"/logo.png"}
      width={1000}
      height={1000}
      className=" w-32 md:w-36 lg:w-40"
    ></Image>
  );
}
