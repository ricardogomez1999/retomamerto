"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1); // Tomorrow
  targetDate.setHours(14, 0, 0, 0); // 2 PM

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        router.push("/login");
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router, targetDate]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-900 text-white">
      <Image src={"/retomamerto.png"} alt="logo" width={150} height={150} />
      <h1 className="text-3xl md:text-4xl lg:text-6xl text-center font-bold mb-8">
        ¡Votaciones Reto Mamerto!
      </h1>
      <div className="flex text-3xl md:text-4xl lg:text-6xl font-mono">
        <p>Falta:</p>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
