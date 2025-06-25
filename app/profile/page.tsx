"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileTitle from "../components/ProfileComponents/ProfileTitle";
import EditModal from "../components/ProfileComponents/EditModal";
import MainProfile from "../components/ProfileComponents/MainProfile";
import ProfilePicture from "../components/ProfileComponents/ProfilePicture";
import CoverPicture from "../components/ProfileComponents/CoverPicture";

export interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  age?: number;
  sex?: string;
  height?: number;
  currentWeight?: number;
  targetWeight?: number;
  weightHistory?: { weight: number; date: string }[];
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
  const [targetWeightInput, setTargetWeightInput] = useState("");
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
  const startWeight =
    user.weightHistory && user.weightHistory.length > 0
      ? user.weightHistory[0].weight
      : user.currentWeight;
  const total =
    startWeight !== undefined && user.targetWeight !== undefined
      ? Math.abs(startWeight - user.targetWeight)
      : null;
  const progress =
    total !== null && total !== 0 && user.currentWeight !== undefined
      ? ((total - Math.abs(user.currentWeight - user.targetWeight!)) / total) *
        100
      : null;

  const openEdit = () => {
    if (user) {
      setAgeInput(user.age?.toString() ?? "");
      setSexInput(user.sex ?? "");
      setHeightInput(user.height?.toString() ?? "");
      setWeightInput(user.currentWeight?.toString() ?? "");
      setTargetWeightInput(user.targetWeight?.toString() ?? "");
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
        targetWeight: targetWeightInput ? Number(targetWeightInput) : undefined,
        weightHistory:
          weightInput && Number(weightInput) !== user.currentWeight
            ? [
                ...(user.weightHistory || []),
                { weight: Number(weightInput), date: new Date().toISOString() },
              ]
            : undefined,
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
          <CoverPicture />
          <div className="relative p-4 pb-6">
            <ProfilePicture user={user} />
            <ProfileTitle user={user} />
            <MainProfile
              bmi={bmi}
              user={user}
              openEdit={openEdit}
              routines={routines}
              progress={progress}
            />
          </div>
        </div>
      </div>
      <EditModal
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        handleSave={handleSave}
        ageInput={ageInput}
        setAgeInput={setAgeInput}
        sexInput={sexInput}
        setSexInput={setSexInput}
        heightInput={heightInput}
        setHeightInput={setHeightInput}
        weightInput={weightInput}
        setWeightInput={setWeightInput}
        targetWeightInput={targetWeightInput}
        setTargetWeightInput={setTargetWeightInput}
        setPhotoFile={setPhotoFile}
      />
    </div>
  );
}
