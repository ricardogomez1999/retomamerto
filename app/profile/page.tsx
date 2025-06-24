"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import EditDialog from "../components/EditDialog";

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
    <div className="p-6 max-w-2xl mx-auto text-white z-10">
      <div className="flex flex-col items-center gap-4 bg-black/50 p-4 rounded-xl">
        <div className=" flex gap-10">
          {true && (
            <Image
              src={"/mamertos2.JPG"}
              alt={user.name}
              width={150}
              height={150}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p>Edad: {user.age ?? "N/A"} años</p>
            <p>Sexo: {user.sex ?? "N/A"}</p>
            <p>Altura: {user.height ?? "N/A"} cm</p>
            <p>Peso actual: {user.currentWeight ?? "N/A"} kg</p>
            {bmi !== null && (
              <>
                <p>Índice de masa corporal: {bmi.toFixed(2)}</p>
                <p>{inGoodShape ? "En buena forma" : "Fuera de forma"}</p>
              </>
            )}
          </div>
        </div>

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
      <AnimatePresence>
        {isEditing && (
          <EditDialog
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
            ageInput={ageInput}
            setAgeInput={setAgeInput}
            setSexInput={setSexInput}
            sexInput={sexInput}
            heightInput={heightInput}
            setHeightInput={setHeightInput}
            setWeightInput={setWeightInput}
            weightInput={weightInput}
            setPhotoFile={setPhotoFile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
