"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  age?: number;
  sex?: string;
  height?: number;
  currentWeight?: number;
  diet?: string;
  gymRoutine?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [routines, setRoutines] = useState<{ name: string; description: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const candidate = JSON.parse(stored) as { _id: string };
      fetch(`/api/users/${candidate._id}`)
        .then((res) => res.json())
        .then(setUser)
        .catch(() => {});
    }
    fetch("/api/routines")
      .then((res) => res.json())
      .then(setRoutines)
      .catch(() => {});
  }, []);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <div className="flex flex-col items-center gap-4 bg-black/50 p-4 rounded-xl">
        {user.photo && (
          <Image src={user.photo} alt={user.name} width={150} height={150} className="rounded-full" />
        )}
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p>Edad: {user.age ?? "N/A"}</p>
        <p>Sexo: {user.sex ?? "N/A"}</p>
        <p>Altura: {user.height ?? "N/A"} cm</p>
        <p>Peso actual: {user.currentWeight ?? "N/A"} kg</p>
        {user.diet && (
          <div className="w-full mt-4">
            <h2 className="text-xl font-semibold mb-2">Dieta actual</h2>
            <p className="whitespace-pre-line">{user.diet}</p>
          </div>
        )}
        <div className="w-full mt-4">
          <h2 className="text-xl font-semibold mb-2">Rutinas de gimnasio</h2>
          <ul className="list-disc pl-5 space-y-2">
            {routines.map((r) => (
              <li key={r.name}>
                <strong>{r.name}:</strong> {r.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
