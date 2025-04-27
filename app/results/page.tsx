"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Candidate = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  points: number;
};

export default function ResultsPage() {
  const [winners, setWinners] = useState<Candidate[]>([]);

  useEffect(() => {
    fetch("/api/results")
      .then((res) => res.json())
      .then((data) => setWinners(data.slice(0, 6))); // Adjusted to top 6
  }, []);

  if (winners.length < 3) {
    return (
      <div className="text-center p-10 text-white">Esperando resultados...</div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl text-white font-bold mb-10">
        🏆 Resultados Finales
      </h1>

      <div className="flex justify-center items-center md:items-end gap-6 flex-col md:flex-row">
        {/* Second Place */}
        <div className="flex flex-col items-center">
          <div className="border-4 border-gray-400 rounded-full overflow-hidden w-36 h-36">
            <Image
              src={winners[1]?.photo?.trimEnd() || ""}
              alt={winners[1]?.name}
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          </div>
          <p className="text-white mt-2 font-semibold">{winners[1]?.name}</p>
          <p className="text-gray-300 text-sm">{winners[1]?.points} puntos</p>
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center">
          <div className="border-6 md:border-8 border-yellow-400 rounded-full overflow-hidden w-40 h-40 md:w-44 md:h-44">
            <Image
              src={winners[0]?.photo?.trimEnd() || ""}
              alt={winners[0]?.name}
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          </div>
          <p className="text-white mt-2 font-bold text-lg">
            {winners[0]?.name}
          </p>
          <p className="text-yellow-300 text-sm">{winners[0]?.points} puntos</p>
        </div>

        {/* Third Place */}
        <div className="flex flex-col items-center">
          <div className="border-4 border-orange-500 rounded-full overflow-hidden w-32 h-32">
            <Image
              src={winners[2]?.photo?.trimEnd() || ""}
              alt={winners[2]?.name}
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          </div>
          <p className="text-white mt-2 font-semibold">{winners[2]?.name}</p>
          <p className="text-gray-300 text-sm">{winners[2]?.points} puntos</p>
        </div>
      </div>

      {winners.length > 3 && (
        <div className="mt-12 bg-black/30 rounded-xl p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🏅 Otros Finalistas
          </h2>
          <table className="w-full text-white table-auto">
            <thead>
              <tr className="border-b border-gray-500">
                <th className="py-2">Lugar</th>
                <th className="py-2">Nombre</th>
                <th className="py-2">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {winners.slice(3, 6).map((candidate, index) => (
                <tr
                  key={candidate._id}
                  className="text-center border-b border-gray-700"
                >
                  <td className="py-2">{index + 4}°</td>
                  <td className="py-2">{candidate.name}</td>
                  <td className="py-2">{candidate.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
