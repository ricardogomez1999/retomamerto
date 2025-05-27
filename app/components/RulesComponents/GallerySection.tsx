import Image from "next/image";
import React from "react";

export default function GallerySection() {
  const images = [
    "/bgMamerto.jpg",
    "/FirstSection.png",
    "/logo.png",
    "/logo2.png",
    "/bgMamerto.jpg",
    "/FirstSection.png",
  ];
  return (
    <section className="py-10 bg-black text-white">
      <h2 className="text-center text-3xl font-bold mb-6">Galería</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-3/4 mx-auto">
        {images.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Reto pasado ${idx + 1}`}
            width={400}
            height={400}
            className="object-cover w-full h-48 rounded-lg"
          />
        ))}
      </div>
    </section>
  );
}
