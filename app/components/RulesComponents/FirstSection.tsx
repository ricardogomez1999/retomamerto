import Image from "next/image";
import React from "react";

export default function FirstSection() {
  return (
    <section className="flex flex-col md:flex-row w-11/12 md:w-3/4 m-auto my-24">
      <div className="w-full md:w-1/2 p-5 order-last md:order-first">
        <ul
          className="text-base md:text-lg lg:text-xl flex flex-col gap-6 justify-center items-center overflow-y-auto max-h-80"
        >
          <li>
            Reto Mamerto combina entrenamiento físico, disciplina personal y
            contenido digital, donde los participantes documentan su evolución
            mediante videos semanales.
          </li>
          <li>
            Cada edición del reto se desarrolla a lo largo de 5 meses,
            integrando actividades físicas como hikes, levantamiento de pesas,
            carreras, y entrenamientos funcionales.
          </li>
          <li>
            El formato del reto se mantiene consistente en cada edición,
            permitiendo comparar resultados, crear clasificaciones, y celebrar a
            los participantes más destacados al finalizar la temporada.
          </li>
          <li>
            Dirigido tanto a atletas como a personas comunes con ganas de
            transformarse, Reto Mamerto es una experiencia de cambio físico,
            mental y social.
          </li>
        </ul>
      </div>
      <div className="w-full md:w-1/2 p-5 relative">
        <div className="absolute inset-0 bg-black/60 z-10 rounded-xl" />
        <Image
          src={"/FirstSection.png"}
          alt="First section"
          width={1500}
          height={1500}
          className="w-full h-full object-cover relative rounded-xl"
        />
      </div>
    </section>
  );
}
