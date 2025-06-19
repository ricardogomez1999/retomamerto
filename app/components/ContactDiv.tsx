import Link from "next/link";
import React from "react";

export default function ContactDiv() {
  return (
    <div className=" bg-white/40 p-10 flex flex-col gap-2">
      <h1 className=" uppercase tracking-wide font-light text-3xl">
        Reto Mamerto
      </h1>
      <p>¿Tienes alguna pregunta?</p>
      <p>
        Usa nuestro{" "}
        <Link href={"/contact"} className=" text-orange-400">
          formulario de contacto
        </Link>
      </p>
      <div className=" flex items-center gap-3">
        <p>Siguenos |</p>
        <ul>
          <li>
            <Link
              target="_blank"
              aria-label="Visit us on Instagram"
              className="text-gray-950 data-hover:text-gray-950/75"
              data-headlessui-state=""
              href="https://www.instagram.com/suprugc?igsh=YTJwZGJueWw1c3l2&utm_source=qr"
            >
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4 text-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 8.05C16 3.603 12.418 0 8 0S0 3.604 0 8.05c0 4.016 2.926 7.346 6.75 7.95v-5.624H4.718V8.05H6.75V6.276c0-2.017 1.194-3.131 3.022-3.131.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.95z"
                ></path>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
