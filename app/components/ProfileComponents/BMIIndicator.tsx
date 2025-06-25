import React from "react";

interface BMIIndicatorProps {
  bmi: number;
}

const categories = [
  { limit: 18.5, label: "bajo", color: "bg-blue-500" },
  { limit: 25, label: "bueno", color: "bg-green-500" },
  { limit: 30, label: "alto", color: "bg-yellow-500" },
  { limit: Infinity, label: "sobrepeso", color: "bg-red-500" },
];

export default function BMIIndicator({ bmi }: BMIIndicatorProps) {
  const activeIndex = categories.findIndex((c) => bmi < c.limit);

  return (
    <div className="flex w-full items-end gap-2">
      {categories.map((category, index) => (
        <div key={index} className="flex-1 relative">
          <div
            className={`${category.color} rounded-full w-full ${
              activeIndex === index ? "h-full" : "h-[5px]"
            }`}
          >
            {activeIndex === index && (
              <p className="block mt-1 text-center text-xs p-1 text-white font-bold">
                {category.label}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
