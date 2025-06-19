import usSections from "@/data";
import Image from "next/image";
import React from "react";

export default function FirstSection() {
  return (
    <>
      {usSections.map((section, index) => (
        <section
          key={index}
          className={`flex flex-col-reverse md:flex-row w-11/12 md:w-3/4 md:h-96 m-auto md:my-48 my-10 bg-black ${
            index % 2 === 1 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div
            className={`w-full md:w-1/2 p-5 flex flex-col justify-center order-last md:order-first md:relative ${
              index % 2 === 1 ? "" : ""
            }`}
          >
            <h1
              className={`text-4xl bg-orange-400 md:absolute pb-8 pt-2   ${
                index % 2 === 1
                  ? "top-0 -right-10 z-50 pl-8 pr-2"
                  : "top-0 -left-10 z-50 pr-8 pl-2"
              }`}
            >
              {section.title}
            </h1>
            <p className="text-2xl md:text-2xl lg:text-3xl">{section.text}</p>
          </div>
          <div className="w-full md:w-1/2 p-5 relative">
            <div className="absolute inset-0 bg-black/60 z-10 rounded-xl" />
            <Image
              src={`/${section.image}.JPG`}
              alt="Introducción"
              width={1500}
              height={1500}
              className="w-full h-full object-cover relative rounded-xl"
            />
          </div>
        </section>
      ))}
    </>
  );
}
