import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        alt="logo"
        src={"/logo2.png"}
        width={1000}
        height={1000}
        className=" w-20"
      ></Image>
    </Link>
  );
}
