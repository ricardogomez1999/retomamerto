"use client";

import FirstSection from "../components/RulesComponents/FirstSection";
import GallerySection from "../components/RulesComponents/GallerySection";
import RulesMenuSection from "../components/RulesComponents/RulesMenuSection";
import ContactFormSection from "../components/RulesComponents/ContactFormSection";

export default function RulesPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className=" bg-orange-500 h-48">
        <h1 className=" text-center text-black text-4xl uppercase font-light flex w-full justify-center items-center h-full ">
          Reglamento
        </h1>
      </section>
      <FirstSection />
      <GallerySection />
      <RulesMenuSection />
      <ContactFormSection />
    </main>
  );
}
