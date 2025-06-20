import events from "@/data/events";
import Image from "next/image";
import React from "react";

export default function MonthlyEvents() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 m-auto lg:p-10 w-3/4 gap-1 lg:gap-5 p-1">
      {events.map((section, index) => (
        <div key={index} className="relative w-full h-full">
          <div className=" w-72 h-48">
            <Image
              src={section.image}
              alt={section.title}
              width={300}
              height={300}
              className=" object-cover w-full h-full grayscale"
            />
          </div>

          <h1 className=" text-white uppercase text-2xl">{section.title}</h1>
          <p className=" text-white absolute bottom-8 md:bottom-16 p-1 font-bold bg-orange-400">
            {section.date}
          </p>
        </div>
      ))}
    </div>
  );
}
