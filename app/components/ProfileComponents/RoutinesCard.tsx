import React from "react";

type RoutinesCard = {
  routines: {
    name: string;
    description: string;
  }[];
};

export default function RoutinesCard({ routines }: RoutinesCard) {
  return (
    <div className=" h-full  md:w-1/2 p-4 bg-white rounded-xl text-black">
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
