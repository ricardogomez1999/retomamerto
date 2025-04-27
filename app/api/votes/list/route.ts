import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Vote from "@/lib/models/Vote";

export async function GET() {
  await dbConnect();

  try {
    const votes = await Vote.find().populate(
      "candidateId firstPlace secondPlace thirdPlace"
    );

    const formattedVotes = votes.map((vote) => ({
      voter: {
        _id: vote.candidateId._id,
        name: vote.candidateId.name,
        email: vote.candidateId.email,
        photo: vote.candidateId.photo,
      },
      firstPlace: vote.firstPlace
        ? {
            _id: vote.firstPlace._id,
            name: vote.firstPlace.name,
            photo: vote.firstPlace.photo,
          }
        : null,
      secondPlace: vote.secondPlace
        ? {
            _id: vote.secondPlace._id,
            name: vote.secondPlace.name,
            photo: vote.secondPlace.photo,
          }
        : null,
      thirdPlace: vote.thirdPlace
        ? {
            _id: vote.thirdPlace._id,
            name: vote.thirdPlace.name,
            photo: vote.thirdPlace.photo,
          }
        : null,
    }));

    return NextResponse.json(formattedVotes);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to load votes" },
      { status: 500 }
    );
  }
}
