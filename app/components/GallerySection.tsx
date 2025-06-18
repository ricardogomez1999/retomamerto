import Image from "next/image";
import React from "react";

export default function GallerySection() {
  const images = [
    "/mamertos2.JPG",
    "/mamertos3.JPG",
    "/mamertos4.JPG",
    "/mamertos5.JPG",
    "/mamertos6.JPG",
    "/mamertos7.JPG",
  ];
  return (
    <section className="py-10 bg-black text-white">
      <h2 className="text-4xl bg-orange-400 p-5 w-fit m-auto my-10">
        Reto Pasado
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-3/4 mx-auto">
        {images.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Reto pasado ${idx + 1}`}
            width={400}
            height={400}
            className="object-cover w-full h-48 rounded-lg grayscale"
          />
        ))}
      </div>
    </section>
  );
}
