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
              href="https://www.instagram.com/retomamerto?igsh=MXRmdm05bXd3MGdzeQ=="
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-brand-instagram"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M16 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-8a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-4 5a4 4 0 0 0 -3.995 3.8l-.005 .2a4 4 0 1 0 4 -4m4.5 -1.5a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
