"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Candidate = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
};

export default function VotePage() {
  const router = useRouter();
  const [voter, setVoter] = useState<Candidate | null>(null);

  const [step, setStep] = useState(1);
  const [firstPlace, setFirstPlace] = useState("");
  const [secondPlace, setSecondPlace] = useState("");
  const [thirdPlace, setThirdPlace] = useState("");
  const [originalCandidates, setOriginalCandidates] = useState<Candidate[]>([]);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("voter");
    if (!stored) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(stored);
    setVoter(parsed);
  }, [router]);

  useEffect(() => {
    if (!voter) return;

    const exclude: string[] = [];
    if (step === 2 && firstPlace) exclude.push(firstPlace);
    if (step === 3) exclude.push(firstPlace, secondPlace);

    const url = new URL(`/api/votes/options`, window.location.origin);
    url.searchParams.set("step", step.toString());
    if (exclude.length) url.searchParams.set("exclude", exclude.join(","));
    if (voter._id) url.searchParams.set("excludeSelf", voter._id);

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
        if (step === 1) {
          setOriginalCandidates(data);
        }
      });
  }, [step, firstPlace, secondPlace, voter]);

  const handleSelect = (id: string) => {
    if (step === 1) setFirstPlace(id);
    if (step === 2) setSecondPlace(id);
    if (step === 3) setThirdPlace(id);
    setError("");
  };

  const nextStep = () => {
    if (
      (step === 1 && !firstPlace) ||
      (step === 2 && !secondPlace) ||
      (step === 3 && !thirdPlace)
    ) {
      setError("Please select a candidate");
      return;
    }
    setStep(step + 1);
  };

  const submitVote = async () => {
    const res = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidateId: voter?._id,
        firstPlace,
        secondPlace,
        thirdPlace,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Something went wrong");
    } else {
      setSuccess("✅ Vote submitted!");
      localStorage.removeItem("voter");
      setTimeout(() => router.push("/thank-you"), 2000);
    }
  };

  const renderCandidates = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-12 mb-6 p-10">
      {candidates
        // Always exclude the voter's own candidate ID from the display
        .filter((c) => c._id !== voter?._id)
        .map((c) => (
          <button
            key={c._id}
            onClick={() => handleSelect(c._id)}
            className={`h-fit w-fit rounded-full transition flex justify-center
              ${
                step === 1 && firstPlace === c._id ? "ring-4 ring-blue-500" : ""
              }
              ${
                step === 2 && secondPlace === c._id
                  ? "ring-4 ring-blue-500"
                  : ""
              }
              ${
                step === 3 && thirdPlace === c._id ? "ring-4 ring-blue-500" : ""
              }`}
          >
            <Image
              src={c.photo?.trimEnd() || ""}
              alt={c.name}
              className="h-56 w-56 md:h-64 md:w-64 lg:h-40 lg:w-40 object-cover rounded-full"
              width={200}
              height={200}
            />
          </button>
        ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center item bg-orange-900 flex-col">
      <div className="max-w-4xl h-fit  w-full items-center bg-black/50 lg:rounded-3xl p-10">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">
          {step === 1 && "Escoge al primer lugar"}
          {step === 2 && "Escoge al segundo lugar"}
          {step === 3 && "Escoge al tercer lugar"}
          {step === 4 && "Confirma tu voto"}
        </h1>

        {step < 4 && renderCandidates()}

        {step === 4 && (
          <div className="text-left text-sm mb-4 text-white">
            <p>
              <strong>1er Lugar:</strong>{" "}
              {originalCandidates.find((c) => c._id === firstPlace)?.name ||
                "..."}
            </p>
            <p>
              <strong>2do Lugar:</strong>{" "}
              {originalCandidates.find((c) => c._id === secondPlace)?.name ||
                "..."}
            </p>
            <p>
              <strong>3er Lugar:</strong>{" "}
              {originalCandidates.find((c) => c._id === thirdPlace)?.name ||
                "..."}
            </p>
          </div>
        )}

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        {step < 4 ? (
          <button
            onClick={nextStep}
            className="w-full bg-[#F8873A] text-white py-2 rounded hover:bg-[#F8873A]/80 font-bold  cursor-pointer"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={submitVote}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Votar
          </button>
        )}
      </div>
    </div>
  );
}
