"use client";

import Header from "./components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#ECECEC] relative">
      <div className=" min-h-9/10 min-w-9/10 absolute inset-3 rounded-xl bg-[url(/bgMamerto.jpg)] bg-center bg-no-repeat bg-cover">
        <Header />
        <hr className=" border-white absolute w-1/2 left-10 bottom-72" />
        <div className="w-px h-full bg-white absolute lg:right-200"></div>
        <h1 className=" uppercase text-white font-bold absolute left-10 bottom-30 text-7xl w-1/2">
          Alcanza tus <span className=" text-orange-500">metas</span> fisicas
        </h1>
        <div className="flex flex-col gap-4 absolute right-20 bottom-30  w-1/3">
          <p className=" text-white text-5xl">
            La mejor forma de lograr tus objetivos
          </p>
          <button className=" bg-orange-500 p-10 rounded-lg text-white text-3xl">
            {" "}
            Ver requisitos
          </button>
        </div>
      </div>
    </div>
  );
}
