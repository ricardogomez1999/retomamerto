import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Vote from "@/lib/models/Vote";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { candidateId, firstPlace, secondPlace, thirdPlace } = await req.json();

  if ([firstPlace, secondPlace, thirdPlace].includes(candidateId)) {
    return NextResponse.json(
      { message: "Cannot vote for yourself" },
      { status: 400 }
    );
  }

  const existingVote = await Vote.findOne({
    candidateId: new mongoose.Types.ObjectId(candidateId),
  });
  if (existingVote) {
    return NextResponse.json(
      { message: "You have already voted" },
      { status: 403 }
    );
  }

  try {
    const vote = await Vote.create({
      candidateId,
      firstPlace,
      secondPlace,
      thirdPlace,
    });
    return NextResponse.json({ vote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
