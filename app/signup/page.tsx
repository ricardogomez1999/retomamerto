"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, age: Number(age), code }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Registro falló");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-orange-900 p-5">
      <div className="max-w-2xl w-full flex flex-col md:flex-row bg-black/50 rounded-3xl md:h-[500px] ">
        <div className="bg-[#F8873A]/90 h-full w-full flex justify-center items-center md:rounded-l-3xl rounded-t-3xl md:rounded-t-none">
          <Image src="/logo2.png" alt="logo" width={150} height={150} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 p-5"
        >
          <h1 className="text-2xl font-bold text-white text-center">
            Regístrate
          </h1>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded bg-white"
          />
          <input
            type="number"
            placeholder="Edad"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded bg-white text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded bg-white text-black"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded bg-white text-black"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded bg-white text-black"
          />
          <input
            type="text"
            placeholder="Código de verificación"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded bg-white text-black"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="w-full bg-[#F8873A] text-white py-2 rounded hover:bg-[#F8873A]/80 font-bold">
            Registrarse
          </button>
        </form>
      </div>
      <Link
        href={"/"}
        className="  bg-[#F8873A] text-white p-2 rounded hover:bg-[#F8873A]/80 font-bold"
      >
        Inicio
      </Link>
    </div>
  );
}
