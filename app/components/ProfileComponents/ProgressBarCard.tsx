import React from "react";
import ProgressBar from "./ProgressBar";

type ProgressBarCard = {
  progress: number | null;
};

export default function ProgressBarCard({ progress }: ProgressBarCard) {
  return (
    <div className=" flex flex-col gap-5 md:w-1/2 p-4 bg-black/70 rounded-xl h-40 shadow-lg justify-center items-center">
      <h1 className=" text-white">Tu progreso</h1>
      <ProgressBar progress={progress} />
    </div>
  );
}
