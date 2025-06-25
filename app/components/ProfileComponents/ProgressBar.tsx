import React from "react";

type ProgressBarType = {
  progress: number | null;
};

export default function ProgressBar({ progress }: ProgressBarType) {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (progress ?? progress! / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="text-black">
      <circle
        stroke="currentColor"
        className="text-gray-700"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="currentColor"
        className="text-orange-500"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-xs font-semibold fill-black"
      >
        {Math.round(progress!)}%
      </text>
    </svg>
  );
}
