import Image from "next/image";
import React from "react";

export default function CoverPicture() {
  return (
    <div className="relative h-40 md:h-60">
      <Image
        src="/bgMamerto.jpg"
        alt="Cover"
        fill
        className="object-cover w-full"
      />
    </div>
  );
}
