import React from "react";
import MonthlyEvents from "../components/CalendarComponents/MonthlyEvents";

export default function page() {
  return (
    <main>
      <section className=" bg-orange-400 h-48">
        <h1 className=" text-center text-white text-4xl uppercase font-light flex w-full justify-center items-center h-full ">
          Calendario de Eventos
        </h1>
      </section>
      <MonthlyEvents />
    </main>
  );
}
