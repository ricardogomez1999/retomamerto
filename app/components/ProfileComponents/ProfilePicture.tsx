import { User } from "@/app/profile/page";
import Image from "next/image";
import React from "react";

type ProfilePictureProps = {
  user: User;
};

export default function ProfilePicture({ user }: ProfilePictureProps) {
  if (user.photo) {
    return (
      <Image
        src={user.photo}
        alt={user.name}
        width={150}
        height={150}
        className="rounded-full border-4 border-white absolute -top-16 left-4 w-32 h-32 object-cover"
      />
    );
  } else {
    return (
      <Image
        src={"/noProfile.png"}
        alt={user.name}
        width={150}
        height={150}
        className="rounded-full border-4 border-white absolute -top-16 left-4 w-32 h-32 object-cover"
      />
    );
  }
}
