"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "El Login fallo");
    } else {
      localStorage.setItem("voter", JSON.stringify(data.candidate));
      router.push("/vote");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center item bg-orange-900 flex-col">
      <div className="max-w-2xl h-96  w-full flex items-center bg-black/50 rounded-3xl">
        <div className=" bg-[#F8873A]/90 h-full w-full flex justify-center items-center rounded-l-3xl">
          <Image src={"/retomamerto.png"} alt="logo" width={150} height={150} />
        </div>
        <form
          onSubmit={handleLogin}
          className=" w-full flex flex-col items-center justify-center gap-5 h-full p-5"
        >
          <h1 className="text-2xl font-bold mb-4 text-white">
            Ingresa para votar
          </h1>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          {error && <p className="text-orange-900 text-sm mb-2">{error}</p>}
          <button className="w-full bg-[#F8873A] text-white py-2 rounded hover:bg-[#F8873A]/80 font-bold  cursor-pointer">
            Empezar
          </button>
        </form>
      </div>
    </div>
  );
}
