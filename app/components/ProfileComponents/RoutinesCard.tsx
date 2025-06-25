import React from "react";

type RoutinesCard = {
  routines: {
    name: string;
    description: string;
  }[];
};

export default function RoutinesCard({ routines }: RoutinesCard) {
  return (
    <div className=" flex flex-col gap-5 md:w-1/2 p-4 bg-black/70 rounded-xl h-40 shadow-lg justify-center overflow-auto">
      <h2 className="text-xl font-semibold mb-2">Rutinas de gimnasio</h2>
      <ul className="list-disc pl-5 space-y-2">
        {routines.map((r) => (
          <li key={r.name}>
            <strong>{r.name}:</strong> {r.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
