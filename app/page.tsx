"use client";
import GallerySection from "./components/GallerySection";
import Titles from "./components/Titles";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-black relative">
        <div className=" min-h-9/10 min-w-9/10 absolute inset-3 rounded-xl bg-[url(/bgMamerto.jpg)] bg-center bg-no-repeat bg-cover">
          <div className="min-h-9/10 min-w-9/10 absolute inset-0 rounded-xl bg-linear-to-r from-transparent to-black"></div>
        </div>
        <Titles />
      </div>
      <GallerySection />
    </>
  );
}
