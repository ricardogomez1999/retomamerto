import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Candidates from "@/lib/models/Candidates";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const step = searchParams.get("step");
  const excludeParam = searchParams.get("exclude");

  if (!step || !["1", "2", "3"].includes(step)) {
    return NextResponse.json(
      { message: "Invalid or missing step parameter" },
      { status: 400 }
    );
  }

  try {
    const excludeIds = excludeParam ? excludeParam.split(",") : [];
    const candidates = await Candidates.find({ _id: { $nin: excludeIds } });
    return NextResponse.json(candidates, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to load candidates", error: err },
      { status: 500 }
    );
  }
}
