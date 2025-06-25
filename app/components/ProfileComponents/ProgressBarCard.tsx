import React from "react";
import ProgressBar from "./ProgressBar";
import { progress } from "framer-motion";

type ProgressBarCard = {
  progress: number | null;
};

export default function ProgressBarCard({ progress }: ProgressBarCard) {
  return (
    <div className=" flex flex-col gap-5 md:w-1/2 p-4 bg-white rounded-xl h-full justify-center items-center">
      <h1 className=" text-black">Tu progreso</h1>
      <ProgressBar progress={progress} />
    </div>
  );
}
