import React from "react";

export default function ThankYouPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-900 p-8">
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <h1 className="text-3xl font-bold text-orange-700 mb-6">
          ¡Gracias por tu voto!
        </h1>
        <p className="text-gray-700 text-lg">
          Tu participación es muy importante para nosotros.
          <br />
          ¡Buena suerte a todos los participantes!
        </p>
      </div>
    </div>
  );
}
