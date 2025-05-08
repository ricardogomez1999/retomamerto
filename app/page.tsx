"use client";

import Header from "./components/Header";
import Titles from "./components/Titles";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#ECECEC] relative">
      <div className=" min-h-9/10 min-w-9/10 absolute inset-3 rounded-xl bg-[url(/bgMamerto.jpg)] bg-center bg-no-repeat bg-cover">
        <div className="min-h-9/10 min-w-9/10 absolute inset-0 rounded-xl bg-linear-to-r from-black/90 to-white/30">
          <Header />
        </div>
      </div>
      <Titles />
    </div>
  );
}
