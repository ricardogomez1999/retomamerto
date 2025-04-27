"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type VotedInfo = {
  voter: {
    _id: string;
    name: string;
    email: string;
    photo?: string;
  };
  firstPlace: {
    _id: string;
    name: string;
    photo?: string;
  } | null;
  secondPlace: {
    _id: string;
    name: string;
    photo?: string;
  } | null;
  thirdPlace: {
    _id: string;
    name: string;
    photo?: string;
  } | null;
};

export default function WhoVotedPage() {
  const [votes, setVotes] = useState<VotedInfo[]>([]);

  useEffect(() => {
    fetch("/api/votes/list")
      .then((res) => res.json())
      .then((data) => setVotes(data));
  }, []);

  if (!votes.length) {
    return <div className="text-center p-10 text-white">Cargando votos...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-900 p-6 flex flex-col items-center">
      <h1 className="text-4xl text-white font-bold mb-8">
        ¿Quién votó por quién?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {votes.map((vote, idx) => (
          <div
            key={idx}
            className="bg-black/40 p-6 rounded-xl flex flex-col items-center text-white"
          >
            <Image
              src={
                vote.voter.photo?.trimEnd() || "https://placehold.co/100x100"
              }
              alt={vote.voter.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
              width={200}
              height={200}
            />
            <h2 className="text-xl font-bold">{vote.voter.name}</h2>

            <div className="mt-4 text-sm space-y-2 text-center">
              <p>
                <strong>1er lugar:</strong> {vote.firstPlace?.name || "No voto"}
              </p>
              <p>
                <strong>2do lugar:</strong>{" "}
                {vote.secondPlace?.name || "No voto"}
              </p>
              <p>
                <strong>3er lugar:</strong> {vote.thirdPlace?.name || "No voto"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
