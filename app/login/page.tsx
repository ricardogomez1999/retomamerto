"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Remove stale login data if it exists
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.expiry && Date.now() > parsed.expiry) {
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.message || "El Login fallo");
      console.log(error);
    } else {
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("user", JSON.stringify({ ...data, expiry }));
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center item bg-orange-900 ">
      <div className="max-w-2xl h-96  w-full flex flex-col md:flex-row items-center bg-black/50 rounded-3xl">
        <div className=" bg-[#F8873A]/90 h-full w-full flex justify-center items-center md:rounded-l-3xl rounded-t-3xl md:rounded-t-none">
          <Image src={"/logo2.png"} alt="logo" width={150} height={150} />
        </div>
        <form
          onSubmit={handleLogin}
          className=" w-full flex flex-col items-center justify-center gap-5 h-full p-5"
        >
          <h1 className="text-2xl font-bold mb-4 text-white">
            Ingresa para ver tu progreso
          </h1>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-2 border rounded bg-white text-black"
          />
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mb-2 border rounded bg-white text-black"
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
