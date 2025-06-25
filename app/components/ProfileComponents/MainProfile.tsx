import React from "react";
import CardBMI from "./CardBMI";
import DietCard from "./DietCard";
import RoutinesCard from "./RoutinesCard";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { User } from "@/app/profile/page";

type MainProfileProps = {
  bmi: number | null;
  user: User;
  openEdit: () => void;
  routines: {
    name: string;
    description: string;
  }[];
};

export default function MainProfile({
  bmi,
  user,
  openEdit,
  routines,
}: MainProfileProps) {
  return (
    <div className="pt-20 flex gap-2">
      <CardBMI bmi={bmi} user={user} />

      {user.diet && <DietCard user={user} />}
      <RoutinesCard routines={routines} />
      <button
        onClick={openEdit}
        className="mt-4 bg-orange-500 p-1 rounded text-white absolute -top-2 right-2 cursor-pointer"
      >
        <PencilSquareIcon width={25} />
      </button>
    </div>
  );
}
