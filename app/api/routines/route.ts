import { NextResponse } from "next/server";

const routines = [
  {
    name: "Arnold Split",
    days: 6,
    description:
      "Classic bodybuilding routine alternating push, pull and legs with high volume.",
  },
  {
    name: "Full Body",
    days: 3,
    description: "A balanced routine hitting all major muscle groups each session.",
  },
];

export async function GET() {
  return NextResponse.json(routines, { status: 200 });
}
