import React from "react";

export default function Titles() {
  return (
    <div className=" absolute flex inset-3">
      {/* <hr className=" border-white absolute w-1/2 left-10 bottom-72 hidden md:block" />
      <div className="w-px h-full bg-white absolute lg:right-200 hidden md:block"></div> */}
      <div className=" p-5 rounded-xl flex flex-col justify-center lg:justify-end lg:items-start gap-10 items-center bg-gray-500/60 md:bg-transparent md:w-1/2">
        <h1 className=" uppercase text-white font-bold left-10 bottom-30 text-5xl lg:text-8xl pb-16">
          Alcanza tus <span className=" text-orange-500">metas</span> fisicas
        </h1>
        <button className=" bg-orange-500 p-5 md:p-10 rounded-lg text-white text-lg md:text-3xl md:hidden">
          Registrate aqui!
        </button>
      </div>

      {/* <div className="md:flex flex-col gap-4 right-20 bottom-30  w-1/2 hidden p-5 justify-end items-end">
        <p className=" text-white text-lg md:text-5xl">
          La mejor forma de lograr tus objetivos
        </p>
        <button className=" bg-orange-500 p-10 rounded-lg text-white text-lg md:text-3xl w-1/2">
          {" "}
          Ver requisitos
        </button>
      </div> */}
    </div>
  );
}
