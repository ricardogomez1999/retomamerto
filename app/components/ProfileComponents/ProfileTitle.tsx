import { User } from "@/app/profile/page";
import Image from "next/image";
import React from "react";

type ProfileTitleProps = {
  user: User;
};

export default function ProfileTitle({ user }: ProfileTitleProps) {
  return (
    <div className="absolute top-2 right-1/6 md:left-1/5">
      <h1 className="text-2xl font-bold ">
        {user.name}, {user.age ?? "N/A"}
      </h1>
      <div className=" flex gap-3">
        <p className=" flex gap-1 text-sm md:text-lg">
          {user.sex === "male" ? (
            <Image
              src={"/male.svg"}
              alt="male"
              width={20}
              height={20}
              className=" w-5 h-5 md:w-6 md:h-6"
            />
          ) : (
            <Image
              src={"/female.svg"}
              alt="female"
              width={20}
              height={20}
              className=" w-5 h-5 md:w-6 md:h-6"
            />
          )}
          Hombre
        </p>
        <div
          className=" flex gap-1
                "
        >
          <Image
            src={"/height.svg"}
            alt="height icon"
            width={20}
            height={20}
            className=" w-5 h-5 md:w-6 md:h-6"
          />{" "}
          <p className=" text-sm">{user.height ?? "N/A"} cm</p>
        </div>
      </div>
    </div>
  );
}
