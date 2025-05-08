import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <div className=" md:flex items-center gap-0 md:gap-14 lg:gap-28 hidden">
      <ul className=" flex justify-between md:gap-10 lg:gap-14 font-light md:text-lg lg:text-xl text-white">
        <li>
          <Link href={"/rules"}>
            <p>Reglamento</p>
          </Link>
        </li>
        <li>
          <Link href={"/us"}>
            <p>Acerca</p>
          </Link>
        </li>
        <li>
          <Link href={"/events"}>
            <p>Calendario</p>
          </Link>
        </li>
      </ul>
      <Link
        href={"registration"}
        className=" bg-orange-500 h-16 px-5 rounded-xl text-white text-lg font-light flex justify-center items-center"
      >
        Únete al reto
      </Link>
    </div>
  );
}
