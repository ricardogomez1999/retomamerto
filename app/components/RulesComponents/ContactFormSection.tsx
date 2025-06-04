"use client";
import React, { useState } from "react";

export default function ContactFormSection() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    age: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, lastName, age, email } = form;
    const body = `Nombre: ${name} ${lastName}%0DEdad: ${age}%0DEmail: ${email}`;
    window.location.href = `mailto:retomamerto@example.com?subject=Interesado%20en%20Reto%20Mamerto&body=${body}`;
  };

  return (
    <section className="py-10 bg-black text-white flex flex-col items-center">
      <h2 className="text-center text-3xl font-bold mb-6">
        ¿Te interesa participar?
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-3/4 mx-auto flex flex-col gap-4 max-w-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
          className="p-2 rounded text-black placeholder-gray-400"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={form.lastName}
          onChange={handleChange}
          required
          className="p-2 rounded text-black placeholder-gray-400"
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={form.age}
          onChange={handleChange}
          required
          className="p-2 rounded text-black placeholder-gray-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-2 rounded text-black placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded font-bold"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
