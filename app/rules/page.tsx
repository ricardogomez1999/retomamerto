"use client";

import FirstSection from "../components/RulesComponents/FirstSection";

export default function RulesPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className=" bg-orange-400 h-48">
        <h1 className=" text-center text-white text-4xl uppercase font-light flex w-full justify-center items-center h-full ">
          Reglamento
        </h1>
      </section>
      <FirstSection />
    </main>
  );
}
