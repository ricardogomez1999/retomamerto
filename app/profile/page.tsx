"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/16/solid";

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
  const [routines, setRoutines] = useState<
    { name: string; description: string }[]
  >([]);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [ageInput, setAgeInput] = useState("");
  const [sexInput, setSexInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.replace("/");
      return;
    }

    const parsedUser = (JSON.parse(stored) as { user: User }).user;

    fetch(`/api/users/${parsedUser._id}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(() => {});
    fetch("/api/routines")
      .then((res) => res.json())
      .then(setRoutines)
      .catch(() => {});
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  const bmi =
    user.currentWeight && user.height
      ? user.currentWeight / Math.pow(user.height / 100, 2)
      : null;
  const inGoodShape = bmi !== null && bmi >= 18.5 && bmi < 25;

  const openEdit = () => {
    if (user) {
      setAgeInput(user.age?.toString() ?? "");
      setSexInput(user.sex ?? "");
      setHeightInput(user.height?.toString() ?? "");
      setWeightInput(user.currentWeight?.toString() ?? "");
      setPhotoFile(null);
    }
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    let photoUrl = user.photo;
    if (photoFile) {
      const data = new FormData();
      data.append("file", photoFile);
      data.append("upload_preset", "retomamerto");
      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dnrdf85ss/upload",
        { method: "POST", body: data }
      );
      const uploadData = await uploadRes.json();
      photoUrl = uploadData.secure_url;
    }

    const res = await fetch(`/api/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: ageInput ? Number(ageInput) : undefined,
        sex: sexInput || undefined,
        height: heightInput ? Number(heightInput) : undefined,
        currentWeight: weightInput ? Number(weightInput) : undefined,
        photo: photoUrl,
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setUser(updated);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[url(/bgMamerto.jpg)] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative max-w-3xl mx-auto pt-6 text-white">
        <div className="bg-black/60 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-40 md:h-60">
            <Image
              src="/bgMamerto.jpg"
              alt="Cover"
              fill
              className="object-cover w-full"
            />
          </div>
          <div className="relative p-4 pb-6">
            {user.photo && (
              <Image
                src={user.photo}
                alt={user.name}
                width={150}
                height={150}
                className="rounded-full border-4 border-white absolute -top-16 left-4 w-32 h-32 object-cover"
              />
            )}
            <div className="pt-20 pl-40">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p>Edad: {user.age ?? "N/A"}</p>
              <p>Sexo: {user.sex ?? "N/A"}</p>
              <p>Altura: {user.height ?? "N/A"} cm</p>
              <p>Peso actual: {user.currentWeight ?? "N/A"} kg</p>
              {bmi !== null && (
                <>
                  <p>Índice de masa corporal: {bmi.toFixed(2)}</p>
                  <p>{inGoodShape ? "En buena forma" : "Fuera de forma"}</p>
                </>
              )}
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
              <button
                onClick={openEdit}
                className="mt-4 bg-orange-500 px-4 py-2 rounded text-white"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isEditing && (
          <Dialog
            static
            open={isEditing}
            onClose={() => setIsEditing(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 flex items-center justify-center bg-black/70">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg w-full max-w-md text-black relative"
              >
                <button
                  onClick={() => setIsEditing(false)}
                  className="absolute top-2 right-2 text-gray-600"
                >
                  <XMarkIcon width={20} height={20} />
                </button>
                <h2 className="text-xl font-bold mb-4">Editar perfil</h2>
                <form onSubmit={handleSave} className="flex flex-col gap-3">
                  <input
                    type="number"
                    placeholder="Edad"
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Sexo"
                    value={sexInput}
                    onChange={(e) => setSexInput(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Altura (cm)"
                    value={heightInput}
                    onChange={(e) => setHeightInput(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Peso actual (kg)"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    className="border p-2 rounded"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white py-2 rounded mt-2"
                  >
                    Guardar
                  </button>
                </form>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
