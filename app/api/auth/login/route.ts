import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Candidates from "@/lib/models/Candidates";
import Vote from "@/lib/models/Vote";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email } = await req.json();

  try {
    const candidate = await Candidates.findOne({ email });
    if (!candidate) {
      return NextResponse.json(
        { message: "Unauthorized: Email not registered" },
        { status: 401 }
      );
    }

    const hasVoted = await Vote.findOne({ candidateId: candidate._id });
    if (hasVoted) {
      return NextResponse.json(
        { message: "You have already voted" },
        { status: 403 }
      );
    }

    return NextResponse.json({ candidate }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err },
      { status: 500 }
    );
  }
}
