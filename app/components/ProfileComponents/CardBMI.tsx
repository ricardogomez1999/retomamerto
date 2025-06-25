import React from "react";
import BMIIndicator from "./BMIIndicator";
import { User } from "@/app/profile/page";

type CardBMIProps = {
  bmi: number | null;
  user: User;
};

export default function CardBMI({ bmi, user }: CardBMIProps) {
  return (
    <div className=" flex flex-col gap-5 md:w-1/2 p-4 bg-black/70 rounded-xl h-40 shadow-lg justify-center">
      <h1 className=" text-4xl text-center text-white font-bold">
        {user.currentWeight ?? "N/A"} kg
        <p className=" text-xs text-gray-400">peso actual</p>
      </h1>
      {bmi !== null && <BMIIndicator bmi={bmi} />}
    </div>
  );
}
