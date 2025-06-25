import { User } from "@/app/profile/page";
import React from "react";

type DietCardProps = {
  user: User;
};

export default function DietCard({ user }: DietCardProps) {
  return (
    <div className="w-full mt-4">
      <h2 className="text-xl font-semibold mb-2">Dieta actual</h2>
      <p className="whitespace-pre-line">{user.diet}</p>
    </div>
  );
}
