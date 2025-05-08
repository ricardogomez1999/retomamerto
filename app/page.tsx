"use client";

import Header from "./components/Header";
import Titles from "./components/Titles";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#ECECEC] relative">
      <div className=" min-h-9/10 min-w-9/10 absolute inset-3 rounded-xl bg-[url(/bgMamerto.jpg)] bg-center bg-no-repeat bg-cover">
        <Header />
      </div>
      <Titles />
    </div>
  );
}
