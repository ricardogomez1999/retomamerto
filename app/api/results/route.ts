import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Vote from "@/lib/models/Vote";
import Candidates from "@/lib/models/Candidates";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const votes = await Vote.find();

    // Map candidateId to total points
    const pointsMap = new Map<string, number>();

    votes.forEach((vote) => {
      if (vote.firstPlace)
        pointsMap.set(
          vote.firstPlace.toString(),
          (pointsMap.get(vote.firstPlace.toString()) || 0) + 3
        );
      if (vote.secondPlace)
        pointsMap.set(
          vote.secondPlace.toString(),
          (pointsMap.get(vote.secondPlace.toString()) || 0) + 2
        );
      if (vote.thirdPlace)
        pointsMap.set(
          vote.thirdPlace.toString(),
          (pointsMap.get(vote.thirdPlace.toString()) || 0) + 1
        );
    });

    const candidates = await Candidates.find();

    const results = candidates.map((candidate) => ({
      _id: candidate._id,
      name: candidate.name,
      email: candidate.email,
      photo: candidate.photo,
      points: pointsMap.get(candidate._id.toString()) || 0,
    }));

    // Sort descending by points
    results.sort((a, b) => b.points - a.points);

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to load results" },
      { status: 500 }
    );
  }
}
