import React from "react";

export default function RulesMenuSection() {
  const rules = [
    "Registrar el progreso semanalmente con videos o fotos",
    "Asistir a todas las sesiones de entrenamiento programadas",
    "Mantener respeto y apoyo entre los participantes",
    "Seguir las indicaciones de los entrenadores y organizadores",
  ];
  return (
    <section className="py-10 bg-orange-500 text-black">
      <h2 className="text-center text-3xl font-bold mb-6">Reglamento</h2>
      <ul className="w-3/4 mx-auto flex flex-col gap-4 list-disc pl-5">
        {rules.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ul>
    </section>
  );
}
