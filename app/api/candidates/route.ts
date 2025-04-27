import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Candidates from "@/lib/models/Candidate";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const step = searchParams.get("step");
  const excludeParam = searchParams.get("exclude");
  const excludeSelf = searchParams.get("excludeSelf");

  if (!step || !["1", "2", "3"].includes(step)) {
    return NextResponse.json(
      { message: "Invalid or missing step parameter" },
      { status: 400 }
    );
  }

  try {
    const excludeIds = [];

    if (excludeSelf) excludeIds.push(excludeSelf);
    if (excludeParam) excludeIds.push(...excludeParam.split(","));

    const candidates = await Candidates.find({ _id: { $nin: excludeIds } });
    return NextResponse.json(candidates, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to load candidates", error: err },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const created = await Candidates.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    if (isValidationError(err)) {
      return NextResponse.json(
        { message: "Validation Error", error: err.message },
        { status: 400 }
      );
    }

    console.error(err); // good practice
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function isValidationError(
  error: unknown
): error is { name: string; message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "ValidationError"
  );
}
